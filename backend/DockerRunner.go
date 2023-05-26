package main

import (
	"context"
	"io"
	"io/ioutil"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/client"
)

type DockerRunner struct {
	cli *client.Client
	ctx context.Context
}

func NewDockerRunner() (*DockerRunner, error) {
	var runner DockerRunner
	var err error

	runner.ctx = context.Background()
	runner.cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}

	reader, err := runner.cli.ImagePull(runner.ctx, "docker.io/library/python:3.11.3-alpine", types.ImagePullOptions{})
	if err != nil {
		return nil, err
	}
	defer reader.Close()

	return &runner, nil
}

func (runner *DockerRunner) Run(sourceCode string) (string, error) {
	file, err := ioutil.TempFile("", "*")
	if err != nil {
		return "", err
	}
	defer os.Remove(file.Name())
	file.Write([]byte(sourceCode))

	resp, err := runner.cli.ContainerCreate(runner.ctx, &container.Config{
		Image: "python:3.11.3-alpine",
		Cmd:   []string{"python", "/script.py"},
		Tty:   true,
	}, &container.HostConfig{
		AutoRemove: true,
		Mounts: []mount.Mount{
			{
				Type:   mount.TypeBind,
				Source: file.Name(),
				Target: "/script.py",
			}},
	}, nil, nil, "")
	if err != nil {
		return "", err
	}

	waiter, _ := runner.cli.ContainerAttach(runner.ctx, resp.ID, types.ContainerAttachOptions{
		Stdout: true,
		Stream: true,
	})

	if err := runner.cli.ContainerStart(runner.ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		return "", err
	}
	//defer runner.cli.ContainerRemove()
	output, err := io.ReadAll(waiter.Reader)

	if err != nil {
		return "", err
	}
	statusCh, errCh := runner.cli.ContainerWait(runner.ctx, resp.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errCh:
		if err != nil {
			return "", err
		}
	case <-statusCh:
	}

	return string(output), nil
}

func (runner *DockerRunner) Close() {
	runner.cli.Close()
}

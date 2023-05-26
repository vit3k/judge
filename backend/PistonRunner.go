package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"
)

type PistonRunner struct {
}

type PistonExecuteRequestFile struct {
	Content string `json:"content"`
}
type PistonExecuteRequest struct {
	Language       string                     `json:"language"`
	Version        string                     `json:"version"`
	Files          []PistonExecuteRequestFile `json:"files"`
	RunTimeout     int                        `json:"run_timeout"`
	RunMemoryLimit int                        `json:"run_memory_limit"`
	Stdin          string                     `json:"stdin"`
	Args           []string                   `json:"args"`
}

type PistonExecuteResponseRun struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
	Code   int    `json:"code"`
	Signal string `json:"signal"`
	Output string `json:"output"`
}

type PistonExecuteResponse struct {
	Language string                   `json:"language"`
	Version  string                   `json:"version"`
	Run      PistonExecuteResponseRun `json:"run"`
}

func NewPistonRunner() (*PistonRunner, error) {
	var runner PistonRunner
	return &runner, nil
}

func (runner *PistonRunner) Run(sourceCode string) (string, error) {
	body, _ := json.Marshal(
		PistonExecuteRequest{
			Language:   "python",
			Version:    "3.10.0",
			Files:      []PistonExecuteRequestFile{{Content: sourceCode}},
			RunTimeout: 1000,
		})

	requestURL := "http://localhost:2000/api/v2/execute"
	req, err := http.NewRequest(http.MethodPost, requestURL, bytes.NewReader(body))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")

	client := http.Client{
		Timeout: 10 * time.Second,
	}
	res, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()
	var response PistonExecuteResponse
	err = json.NewDecoder(res.Body).Decode(&response)
	if err != nil {
		return "", err
	}
	return response.Run.Output, nil
}

func (runner *PistonRunner) Close() {
}

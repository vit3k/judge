package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Runner interface {
	Close()
	Run(sourceCode string) (string, error)
}

var runner Runner

/*type Run struct {
	ID        string
	CreatedAt time.Time

	SourceCode string
	Output     string
}*/

type RunRequest struct {
	SourceCode string `json:"source_code"`
}

type RunResponse struct {
	Status string `json:"status"`
	Output string `json:"output"`
}

func run(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	var runRequest RunRequest
	err := json.NewDecoder(r.Body).Decode(&runRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	output, err := runner.Run(runRequest.SourceCode)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(RunResponse{Status: "OK", Output: output})
}

func main() {
	var err error
	runner, err = NewPistonRunner()
	if err != nil {
		log.Fatal(err)
	}
	defer runner.Close()

	http.HandleFunc("/", run)

	err = http.ListenAndServe(":3333", nil)
	if err != nil {
		panic(err)
	}
}

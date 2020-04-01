package git

import (
	"bytes"
	"fmt"
	"github.com/RedHatGov/ocdb/pkg/utils"
	"os"
	"os/exec"
	"strings"
	"time"
)

func Clone(gitRepo, directory string, since *time.Time) error {
	gitCmd := exec.Command("git", "clone", "--depth", "1", gitRepo, directory)
	if since != nil {
		gitCmd = exec.Command("git", "clone", "--shallow-since", since.AddDate(0, 0, -1).String(), gitRepo, directory)
	}
	logWriter := utils.LogWriter{}
	gitCmd.Stdout = &logWriter
	gitCmd.Stderr = &logWriter

	err := gitCmd.Run()
	if err != nil {
		return fmt.Errorf("Error running git clone: %v", err)
	}
	return nil
}

func Pull(directory string) error {
	gitCmd := exec.Command("git", "pull")
	gitCmd.Dir = directory
	logWriter := utils.LogWriter{}
	gitCmd.Stdout = &logWriter
	gitCmd.Stderr = &logWriter

	err := gitCmd.Run()
	if err != nil {
		return fmt.Errorf("Error running git pull: %v", err)
	}
	return nil
}

func PullOrClone(directory, gitRepo string, since *time.Time) error {
	if stat, err := os.Stat(directory); err == nil && stat.IsDir() {
		return Pull(directory)
	}
	return Clone(gitRepo, directory, since)
}

func LastCommitBy(directory string, date time.Time) (string, error) {
	command := fmt.Sprintf("git log  --pretty=format:\"%%H\" --until=\"%s\" | head -n 1", date)

	gitCmd := exec.Command("bash", "-c", command)
	gitCmd.Dir = directory
	stdout := bytes.Buffer{}
	stderr := bytes.Buffer{}
	gitCmd.Stdout = &stdout
	gitCmd.Stderr = &stderr

	err := gitCmd.Run()
	if err != nil || stderr.Len() > 0 {
		return "", fmt.Errorf("Error running git log: %v; stderr: %s", err, stderr.String())
	}

	return strings.Replace(stdout.String(), "\n", "", 1), nil
}

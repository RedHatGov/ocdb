package git

import (
	"bytes"
	"fmt"
	"os/exec"
)

func Clone(gitRepo, directory string) error {
	gitCmd := exec.Command("git", "clone", "--depth", "1", gitRepo, directory)
	gitCmdOutput := &bytes.Buffer{}
	gitCmdErr := &bytes.Buffer{}
	gitCmd.Stdout = gitCmdOutput
	gitCmd.Stderr = gitCmdErr

	err := gitCmd.Run()
	if err != nil {
		return fmt.Errorf("Error running git clone: %v, stderr was: %s", err, gitCmdErr.String())
	}
	return nil
}

func Pull(directory string) error {
	gitCmd := exec.Command("git", "pull")
	gitCmd.Dir = directory
	gitCmdOutput := &bytes.Buffer{}
	gitCmdErr := &bytes.Buffer{}
	gitCmd.Stdout = gitCmdOutput
	gitCmd.Stderr = gitCmdErr

	err := gitCmd.Run()
	if err != nil {
		return fmt.Errorf("Error running git pull: %v, stderr was: %s", err, gitCmdErr.String())
	}
	return nil
}

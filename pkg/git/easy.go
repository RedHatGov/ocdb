package git

import (
	"bytes"
	"fmt"
	"github.com/RedHatGov/ocdb/pkg/utils"
	"os/exec"
)

func Clone(gitRepo, directory string) error {
	gitCmd := exec.Command("git", "clone", "--depth", "1", gitRepo, directory)
	gitCmdErr := &bytes.Buffer{}
	gitCmd.Stdout = &utils.LogWriter{}
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
	gitCmdErr := &bytes.Buffer{}
	gitCmd.Stdout = &utils.LogWriter{}
	gitCmd.Stderr = gitCmdErr

	err := gitCmd.Run()
	if err != nil {
		return fmt.Errorf("Error running git pull: %v, stderr was: %s", err, gitCmdErr.String())
	}
	return nil
}

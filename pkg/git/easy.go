package git

import (
	"fmt"
	"github.com/RedHatGov/ocdb/pkg/utils"
	"os"
	"os/exec"
)

func Clone(gitRepo, directory string) error {
	gitCmd := exec.Command("git", "clone", "--depth", "1", gitRepo, directory)
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

func PullOrClone(directory, gitRepo string) error {
	if stat, err := os.Stat(directory); err == nil && stat.IsDir() {
		return Pull(directory)
	}
	return Clone(gitRepo, directory)
}

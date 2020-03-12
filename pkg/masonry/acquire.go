package masonry

import (
	"errors"
	"fmt"
	"github.com/opencontrol/compliance-masonry/pkg/cli/get/resources"
	"github.com/opencontrol/compliance-masonry/pkg/lib"
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"github.com/opencontrol/compliance-masonry/pkg/lib/opencontrol"
	"github.com/opencontrol/compliance-masonry/pkg/lib/opencontrol/versions/1.0.0"
)

func (d *OpencontrolData) populateCacheDir() error {
	repo := make([]common.RemoteSource, 1)
	repo[0] = schema.VCSEntry{
		URL:      "https://github.com/ComplianceAsCode/redhat",
		Revision: "master",
		Path:     ""}
	getter := resources.NewVCSAndLocalGetter(opencontrol.YAMLParser{})
	return getter.GetRemoteResources(d.cacheDir, "opencontrols", repo)
}

func newOpencontrolData() (*OpencontrolData, error) {
	res := OpencontrolData{cacheDir: "/tmp/.masonry_cache"}
	err := res.populateCacheDir()
	if err != nil {
		return nil, err
	}

	var errs []error
	res.workspace, errs = lib.LoadData(res.cacheDir, res.cacheDir+"/certifications/dhs-4300a.yaml")
	if errs != nil {
		msg := "Error occurred during loading open control masonry data"
		for _, e := range errs {
			msg = fmt.Sprintf("%s: %v", msg, e)
		}
		err = errors.New(msg)
	}
	return &res, err
}

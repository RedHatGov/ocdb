package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/cli/get/resources"
	"github.com/opencontrol/compliance-masonry/pkg/lib"
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"github.com/opencontrol/compliance-masonry/pkg/lib/opencontrol"
	"github.com/opencontrol/compliance-masonry/pkg/lib/opencontrol/versions/1.0.0"
)

func buildCache() error {
	destination := "/tmp/.masonry_cache"

	repo := make([]common.RemoteSource, 1)
	repo[0] = schema.VCSEntry{
		URL:      "https://github.com/ComplianceAsCode/redhat",
		Revision: "master",
		Path:     ""}
	getter := resources.NewVCSAndLocalGetter(opencontrol.YAMLParser{})
	return getter.GetRemoteResources(destination, "opencontrols", repo)
}

func build() (common.Workspace, []error) {
	err := buildCache()
	if err != nil {
		return nil, []error{err}
	}
	return lib.LoadData("/tmp/.masonry_cache", "/tmp/.masonry_cache/certifications/dhs-4300a.yaml")
}

package cac

import (
	"github.com/RedHatGov/ocdb/pkg/utils"
	"github.com/rolieup/golie/pkg/rolie"
)

func buildRolieFeed() error {
	utils.Log.Debug("Re-building ROLIE feed.")
	builder := rolie.Builder{
		ID:            "compliance-as-code",
		Title:         "Rolie feed for the latest SCAP files by ComplianceAsCode",
		RootURI:       "https://atopathways.redhatgov.io/compliance-as-code/scap/",
		DirectoryPath: installScapCache,
	}
	return builder.New()

}

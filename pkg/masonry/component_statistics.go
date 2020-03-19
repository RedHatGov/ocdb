package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
)

type CertificationStatistics struct {
	Certification string
	Results       map[string]int
}

type ComponentStatistics struct {
	Key            string
	Name           string
	Certifications map[string]CertificationStatistics
}

func (ms *OpencontrolData) ComponentStatistics(c common.Component) ComponentStatistics {
	res := ComponentStatistics{}
	res.Key = c.GetKey()
	res.Name = c.GetName()
	res.Certifications = map[string]CertificationStatistics{}

	satisfiesMap := map[string]string{}
	for _, sat := range c.GetAllSatisfies() {
		satisfiesMap[sat.GetControlKey()] = sat.GetImplementationStatus()
	}

	for _, cert := range ms.GetAllCertifications() {
		stats := CertificationStatistics{}
		stats.Certification = cert.Key
		stats.Results = map[string]int{}
		for standardName, subSet := range cert.Controls {
			if standardName == "NIST-800-53" {
				for ctrlID, _ := range subSet {
					status, found := satisfiesMap[ctrlID]
					if !found {
						status = "unknown"
					}
					prev, found := stats.Results[status]
					if !found {
						prev = -1
					}
					stats.Results[status] = prev + 1
				}
			}
		}

		res.Certifications[cert.Key] = stats
	}
	return res
}

package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
)

type ResultStats map[string]int

type CertificationStatistics struct {
	Certification string
	Results       ResultStats
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
		stats.Results = ResultStats{}
		for standardName, subSet := range cert.Controls {
			if standardName == "NIST-800-53" {
				for ctrlID, _ := range subSet {
					status, found := satisfiesMap[ctrlID]
					if !found {
						status = "unknown"
					}
					prev, found := stats.Results[status]
					if !found {
						prev = 0
					}
					stats.Results[status] = prev + 1
				}
			}
		}

		res.Certifications[cert.Key] = stats
	}
	return res
}

type CertificationFamilyStatistics map[string]ResultStats

type ComponentFamilyStatistics struct {
	Key            string
	Certifications map[string]CertificationFamilyStatistics
}

func (ms *OpencontrolData) ComponentFamilyStatistics(c common.Component) ComponentFamilyStatistics {
	res := ComponentFamilyStatistics{}
	res.Key = c.GetKey()
	res.Certifications = map[string]CertificationFamilyStatistics{}

	satisfiesMap := map[string]string{}
	for _, sat := range c.GetAllSatisfies() {
		satisfiesMap[sat.GetControlKey()] = sat.GetImplementationStatus()
	}

	for _, cert := range ms.GetAllCertifications() {
		cMap := CertificationFamilyStatistics{}
		for standardName, subSet := range cert.Controls {
			if standardName == "NIST-800-53" {
				for ctrlID, _ := range subSet {
					status, found := satisfiesMap[ctrlID]
					if !found {
						status = "unknown"
					}
					family := ctrlID[0:2]

					_, found = cMap[family]
					if !found {
						cMap[family] = ResultStats{}
					}

					prev, found := cMap[family][status]
					if !found {
						prev = 0
					}
					cMap[family][status] = prev + 1
				}
			}
		}
		res.Certifications[cert.Key] = cMap
	}
	return res
}

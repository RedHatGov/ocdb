package api

import (
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo"
)

// ComponentsResource show components like defined by opencontrols
type CertificationsResource struct {
	buffalo.Resource
}

// List default implementation.
func (v CertificationsResource) List(c buffalo.Context) error {
	ms := masonry.GetInstance()
	certs, _ := ms.GetAllCertifications()
	return c.Render(200, r.JSON(certs))
}

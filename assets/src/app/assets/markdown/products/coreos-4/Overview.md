## Common Criteria
CoreOS v4.x has not undergone Common Criteria certification. A future certification
against the [NIAP Protection Profile for Application Software](https://www.niap-ccevs.org/Profile/Info.cfm?PPID=394&id=394) is being considered.

To help Red Hat track demand for a Common Criteria certification of CoreOS v4.x, please <a href="https://access.redhat.com/support/cases/#/case/new">open a customer support case</a> requesting a certification.

## FIPS 140-2
Federal Information Processing Standard 140-2 is a legal requirement ensuring cryptographic tools implement algorithms properly. Vendors must certify their cryptographic implementations through NIST's [Cryptographic Module Validation Program](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program).

FIPS 140-2 validation does not constitute an entire product. Rather, underlying cryptographic
subsystems or components, such as OpenSSL and OpenSSH, are validated. 

CoreOS 4.3+ provides FIPS validated cryptographc functions to Red Hat Openshift Container Platform via FIPS validated RHEL libraries when [properly configured](https://docs.openshift.com/container-platform/4.3/installing/installing-fips.html) before initial cluster boot. FIPS 140-2 validated crytpographic functions are used by critical portions of Openshift which store data, including the etcd database when encrypted and containerized workloads when configured to use the CRI-O container runtimes.

### USGv6 / IPv6
CoreOS v4.x does not have any US Government IPv6 certifications.

### Section 508 / VPAT
CoreOS 4.x does not currently have a VPAT document. CoreOS is designed to provide operating system services for Openshift, which provides the primary user interfaces. Refer to the corresponding [Openshift overview and VPAT](https://atopathways.redhatgov.io/ato/products/openshift-container-platform-4/Overview).

### Configuration Guides
A NIST National Checklist for CoreOS v4.x is currently being developed. 

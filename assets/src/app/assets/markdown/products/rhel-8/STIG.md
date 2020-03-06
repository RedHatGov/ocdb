## STIG

STIG guidance in form of SCAP content is being developed under [ComplianceAsCode project](https://github.com/ComplianceAsCode/content). Configuration compliance with the given SCAP content can be assessed automatically using [OpenSCAP tool](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/scanning-the-system-for-security-compliance-and-vulnerabilities_security-hardening).

### Latest development documents
This is a *draft* profile for STIG. This profile is being developed under the DoD consensus model to become a STIG in coordination with DISA FSO. Latest version of the documents can be obtained from upstream project or under following links.

Available downloads:
 * Implementation Guide: [HTML](/cac/guides/ssg-rhel8-guide-stig.html)
 * SRG Mapping Table: [HTML](/cac/tables/table-rhel8-srgmap-flat.html), [CSV](/cac/tables/table-rhel8-srgmap-flat.csv)
 * SCAP content
   * All in one DataStream: [SCAP 1.3](/cac/ssg-rhel8-ds.xml), [SCAP 1.2](/cac/ssg-rhel8-ds-1.2.xml)
   * Checklist: [XCCDF 1.2](/cac/ssg-rhel8-xccdf-1.2.xml), [XCCDF 1.1](/cac/ssg-rhel8-xccdf.xml)
     * Assessment Details: [OVAL](/cac/ssg-rhel8-oval.xml)
     * Questionnaires: [OCIL](/cac/ssg-rhel8-ocil.xml)
 * All in one remediation script: [Ansible Playbook](/cac/ansible/rhel8-playbook-stig.yml), [Bash](/cac/bash/rhel8-script-stig.sh)

### Download released content available at NIST NVD
 * [NIST National Checklist for Red Hat Enterprise Linux 8.x content v0.1.48 Checklist Details](https://nvd.nist.gov/ncp/checklist/909)

## SCAP

SCAP content for Red Hat OpenStack Platform is being developed under [ComplianceAsCode project](https://github.com/ComplianceAsCode/content). Configuration compliance with the given SCAP content can be assessed automatically using [OpenSCAP tool](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/scanning-the-system-for-security-compliance-and-vulnerabilities_security-hardening).

### Download released content available at NIST NVD
 * [FedRAMP Moderate for Red Hat OpenStack Platform 13 Checklist Details](https://nvd.nist.gov/ncp/checklist/864)

### STIG Latest greatest documents
This is a *draft* profile for STIG. This profile is being developed under the DoD consensus model to become a STIG in coordination with DISA FSO. Latest version of the documents can be obtained from upstream project or under following links.

Available downloads:
 * Implementation Guide: [HTML](/cac/guides/ssg-rhosp13-guide-stig.html)
 * SCAP content
   * All in one DataStream: [SCAP 1.3](/cac/ssg-rhosp13-ds.xml), [SCAP 1.2](/cac/ssg-rhosp13-ds-1.2.xml)
   * Checklist: [XCCDF 1.2](/cac/ssg-rhosp13-xccdf-1.2.xml), [XCCDF 1.1](/cac/ssg-rhosp13-xccdf.xml)
     * Assessment Details: [OVAL](/cac/ssg-rhosp13-oval.xml)
     * Questionnaires: [OCIL](/cac/ssg-rhosp13-ocil.xml)
 * All in one remediation script: [Ansible Playbook](/cac/ansible/rhosp13-playbook-stig.yml), [Bash](/cac/bash/rhosp13-script-stig.sh)


## SCAP

SCAP content for Ansible Tower is being developed under [ComplianceAsCode project](https://github.com/ComplianceAsCode/content). Configuration compliance with the given SCAP content can be assessed automatically using [OpenSCAP tool](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/configuration-compliance-scanning_scanning-the-system-for-configuration-compliance-and-vulnerabilities).

### STIG

This is a *draft* profile for STIG. This profile is being developed under the DoD consensus model to become a STIG in coordination with DISA FSO.

Available downloads:
 * Implementation Guide [HTML](/cac/guides/ssg-rhel7-guide-tower-stig.html)
 * SCAP content
   * All in one [SCAP 1.3 DataStream](/cac/ssg-rhel7-ds.xml), [SCAP 1.2 DataStream](/cac/ssg-rhel7-ds-1.2.xml)
   * Checklist [XCCDF 1.2](/cac/ssg-rhel7-xccdf-1.2.xml), [XCCDF 1.1](/cac/ssg-rhel7-xccdf.xml)
     * Assessment Details [OVAL](/cac/ssg-rhel7-oval.xml)
     * Questionnaires [OCIL](/cac/ssg-rhel7-ocil.xml)
 * All in one Ansible Playbook [YAML](/cac/ansible/rhel7-playbook-tower-stig.yml)
 * All in one configuration script [Bash](/cac/bash/rhel7-script-stig.sh)

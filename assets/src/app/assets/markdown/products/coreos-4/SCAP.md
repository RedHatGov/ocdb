## SCAP

SCAP content for Red Hat Enterprise Linux CoreOS is being developed under [ComplianceAsCode project](https://github.com/ComplianceAsCode/content). Configuration compliance with the given SCAP content can be assessed automatically using [OpenSCAP tool](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/scanning-the-system-for-security-compliance-and-vulnerabilities_security-hardening).

Introductionary material for scanning RHEL CoreOS 4 nodes from inside the OpenShift 4 cluster is available at [OpenShift Blog](https://www.openshift.com/blog/rhel-coreos-compliance-scanning-in-openshift-4)

Enterprising users are invited to early use of [compliance-operator](https://github.com/openshift/compliance-operator). Compliance-operator, when loading inside OpenShift cluster can be used to assess OpenShift nodes from inside the cluster. Compliance-operator is also able to remediate configuration setting using Ignition script language using Machine Config Operator directly.

### Latest Greatest Documents
This is a *draft* content. This profile reflects U.S. Government consensus content and is developed through the OpenSCAP/ComplianceAsCode initiative, championed by the National Security Agency. Latest version of the documents can be obtained from upstream project or under following links.

Available profiles:
 * Australian Cyber Security Centre (ACSC) Essential Eight: [HTML](/cac/guides/ssg-rhcos4-guide-e8.html), [Ignition](/cac/rhcos4/ignition-fixes.xml)
 * NIST 800-53 Moderate-Impact Baseline for Red Hat Enterprise Linux CoreOS: [HTML](/cac/guides/ssg-rhcos4-guide-moderate.html), [Ignition](/cac/rhcos4/ignition-fixes.xml)
 * NIST National Checklist for Red Hat Enterprise Linux CoreOS: [HTML](/cac/guides/ssg-rhcos4-guide-ncp.html), [Ignition](/cac/rhcos4/ignition-fixes.xml)

SCAP content:
 * All in one DataStream: [SCAP 1.3](/cac/ssg-rhcos4-ds.xml), [SCAP 1.2](/cac/ssg-rhcos4-ds-1.2.xml)
 * Checklist: [XCCDF 1.2](/cac/ssg-rhcos4-xccdf-1.2.xml), [XCCDF 1.1](/cac/ssg-rhcos4-xccdf.xml)
   * Assessment Details: [OVAL](/cac/ssg-rhcos4-oval.xml)
   * Questionnaire: [OCIL](/cac/ssg-rhcos4-ocil.xml)

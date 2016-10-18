/**
 * English localization.
 */

var Constants = require('../constants/Constants');

module.exports = {
    'locale': 'en',

    'messages': {
        'add': 'Add',
        'back': 'Go Back',
        'cancel': 'Cancel',
        'open': 'Open',
        'close': 'Close',
        'cancel-tooltip': 'Discard changes',
        'save': 'Save',
        'delete': 'Delete',
        'remove': 'Remove',
        'headline': 'Headline',
        'name': 'Name',
        'summary': 'Summary',
        'narrative': 'Narrative',
        'fileNo': 'File number',
        'table-actions': 'Actions',
        'table-edit': 'Edit',
        'save-success-message': 'Report successfully saved.',
        'save-failed-message': 'Unable to save report. Server responded with message: ',
        'author': 'Author',
        'author-title': 'Report author',
        'description': 'Description',
        'select.default': '--- Select ---',
        'yes': 'Yes',
        'no': 'No',
        'unknown': 'Unknown',
        'uploading-mask': 'Uploading',
        'please-wait': 'Please wait...',

        'detail.save-tooltip': 'Save changes',
        'detail.saving': 'Saving...',
        'detail.invalid-tooltip': 'Some of the required values are missing',
        'detail.large-time-diff-tooltip': 'Occurrence start and end time difference is too large',
        'detail.submit': 'Create new revision',
        'detail.submit-tooltip': 'Create new revision of this report',
        'detail.submit-success-message': 'Report successfully submitted.',
        'detail.submit-failed-message': 'Unable to submit report. Server responded with message: ',
        'detail.phase-transition-success-message': 'Report phase transition successful.',
        'detail.phase-transition-failed-message': 'Report phase transition failed with error: ',
        'detail.loading': 'Loading report...',
        'detail.not-found.title': 'Report not found',

        'login.title': Constants.APP_NAME + ' - Login',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.submit': 'Login',
        'login.register': 'Register',
        'login.error': 'Authentication failed.',
        'login.progress-mask': 'Logging in...',

        'register.title': Constants.APP_NAME + ' - Registration',
        'register.first-name': 'First name',
        'register.last-name': 'Last name',
        'register.username': 'Username',
        'register.password': 'Password',
        'register.password-confirm': 'Confirm password',
        'register.passwords-not-matching-tooltip': 'Passwords don\'t match',
        'register.submit': 'Register',
        'register.mask': 'Registering...',

        'main.dashboard-nav': 'Dashboards',
        'main.reports-nav': 'Reports',
        'main.statistics-nav': 'Statistics',
        'main.logout': 'Logout',
        'main.search-placeholder': 'Search',
        'main.search.fulltext': 'Full text',
        'main.search.fulltext-tooltip': 'Search for the specified string everywhere',
        'main.tacr-notice': 'Project was supported by the Technology Agency of the Czech Republic.',

        'dashboard.welcome': 'Hello {name}, Welcome to ' + Constants.APP_NAME + '.',
        'dashboard.create-new-occurrence-report-tile': 'Create New Occurrence Report',
        'dashboard.create-new-safety-issue-tile': 'Create New Safety Issue',
        'dashboard.create-new-audit-report-tile': 'Create New Audit Report',
        'dashboard.create-import-tile': 'Import Report',
        'dashboard.recent-panel-heading': 'Recently Edited/Added Reports',
        'dashboard.recent-table-last-edited': 'Last modified',
        'dashboard.recent.no-reports': 'There are no reports, yet.',
        'dashboard.import.import-e5': 'Import E5X/E5F report',

        'dashboard.unprocessed': 'You have {count} unprocessed report(s).',

        'dropzone.title': 'Drop the file here or click to select a file to upload.',
        'dropzone-tooltip': 'Click here to select a file to upload',

        'reports.no-reports': 'There are no reports, yet. You can create one ',
        'reports.no-reports.link': 'here.',
        'reports.no-reports.link-tooltip': 'Go to dashboard',
        'reports.open-tooltip': 'Click to see report detail and edit it',
        'reports.delete-tooltip': 'Delete this report',
        'reports.loading-mask': 'Loading reports...',
        'reports.panel-title': 'Reports',
        'reports.table-date': 'Date',
        'reports.table-date.tooltip': 'Date and time of the reported event',
        'reports.table-moreinfo': 'Additional info',
        'reports.table-type': 'Report type',
        'reports.table-classification': 'Category',
        'reports.table-classification.tooltip': 'Select occurrence category to show',
        'reports.phase': 'Report state',
        'reports.filter.label': 'Filter',
        'reports.filter.type.tooltip': 'Select report type',
        'reports.filter.type.all': 'All',
        'reports.filter.type.label': 'Report type filters:',
        'reports.filter.no-matching-found': 'No reports match the selected filters.',
        'reports.filter.reset': 'Reset filters',
        'reports.paging.item-count': 'Showing {showing} of {total} items.',
        'reports.create-report': 'Create report',

        'delete-dialog.title': 'Delete {type} Report?',
        'delete-dialog.content': 'Are you sure you want to remove this report?',

        'occurrence.headline-tooltip': 'Short descriptive summary of the occurrence - this field is required',
        'occurrence.start-time': 'Occurrence start',
        'occurrence.start-time-tooltip': 'Date and time when the event occurred',
        'occurrence.end-time': 'Occurrence end',
        'occurrence.end-time-tooltip': 'Date and time when the event ended',
        'occurrence.class': 'Occurrence class',
        'occurrence.class-tooltip': 'Occurrence class - this field is required',

        'safety-issue.panel.active-tooltip': 'This safety issue is currently active',
        'safety-issue.panel.inactive-tooltip': 'This safety issue is currently not active',
        'safety-issue.name-tooltip': 'Short descriptive name of the issue - this field is required',
        'safety-issue.activate': 'Activate',
        'safety-issue.activate-tooltip': 'Make this safety issue active',
        'safety-issue.deactivate': 'Deactivate',
        'safety-issue.deactivate-tooltip': 'Deactivate this safety issue',
        'safety-issue.base.remove-tooltip': 'Remove this report from this safety issue\'s bases',
        'safety-issue.base.no-bases': 'This safety issue is not based on any existing reports.',

        'audit.name-tooltip': 'Short descriptive name of the audit (e.g. audited organization name + date of audit) - this field is required',
        'audit.type.label': 'Audit type',
        'audit.type.placeholder': 'Select audit type',
        'audit.auditee.label': 'Audited organization',
        'audit.auditee.placeholder': 'Audited organization name',
        'audit.location.label': 'Audit location',
        'audit.location.placeholder': 'Where the audit took place',
        'audit.start-date': 'Audit start',
        'audit.start-date.tooltip': 'Date and time of the first action of the audit',
        'audit.end-date': 'Audit end',
        'audit.end-date.tooltip': 'Date and time of the last action of the audit',
        'audit.remarks': 'Remarks',
        'audit.remarks.placeholder': 'Audit remarks',
        'audit.findings.header': 'Audit findings',
        'audit.findings.no-findings-message': 'There are no audit findings.',
        'audit.findings.table.description': 'Finding description',
        'audit.findings.table.type': 'Type',
        'audit.findings.table.level': 'Level',
        'audit.findings.table.open-tooltip': 'View and edit this finding',
        'audit.findings.table.delete-tooltip': 'Remove this finding',
        'audit.findings.add-tooltip': 'Add audit finding',
        'audit.finding.header': 'Audit finding',
        'audit.finding.type.label': 'Finding type',
        'audit.finding.type.placeholder': 'Select finding type',
        'audit.finding.type.edit-tooltip': 'Click to edit finding type',
        'audit.finding.level': 'Finding level {level}',
        'audit.finding.level-1.help': 'A level 1 finding shall be issued by the competent authority when any significant noncompliance '
        + 'is detected with the applicable requirements of Regulation (EC) No 216/2008 and '
        + 'its Implementing Rules, with the organisation’s procedures and manuals or with the terms of '
        + 'an approval or certificate or with the content of a declaration which lowers safety or seriously '
        + 'hazards flight safety. '
        + 'The level 1 findings shall include: '
        + '(1) failure to give the competent authority access to the organisation\'s facilities as defined '
        + 'in ORO.GEN.140 during normal operating hours and after two written requests; '
        + '(2) obtaining or maintaining the validity of the organisation certificate by falsification of '
        + 'submitted documentary evidence; '
        + '(3) evidence of malpractice or fraudulent use of the organisation certificate; and '
        + '(4) the lack of an accountable manager.',
        'audit.finding.level-2.help': 'A level 2 finding shall be issued by the competent authority when any non-compliance is '
        + 'detected with the applicable requirements of Regulation (EC) No 216/2008 and its '
        + 'Implementing Rules, with the organisation\'s procedures and manuals or with the terms of an '
        + 'approval or certificate or with the content of a declaration which could lower safety or hazard '
        + 'flight safety.',
        'audit.finding.description-tooltip': 'Description of the finding',
        'audit.finding.factors': 'Finding factors',
        'audit.finding.factors.placeholder': 'Factor type',
        'audit.finding.factors.remove-tooltip': 'Click to remove this factor',
        'audit.finding.measures.no-measures-message': 'There are not corrective measures',
        'audit.finding.measures.description': 'Measure description',
        'audit.finding.measures.deadline': 'Measure deadline',
        'audit.finding.measures.implemented': 'Implemented?',
        'audit.finding.measures.implemented.yes': 'The corrective measure has been implemented',
        'audit.finding.measures.implemented.no': 'The corrective measure has not been implemented, yet',
        'audit.finding.measures.open-tooltip': 'View and edit this corrective measure',
        'audit.finding.measures.delete-tooltip': 'Remove this corrective measure',
        'audit.finding.measures.add.select-existing': 'Select existing',
        'audit.finding.measures.add.select-existing-tooltip': 'Select corrective measure from another finding of this audit',
        'audit.finding.measures.add.create-new': 'Create new',
        'audit.finding.measures.add.create-new-tooltip': 'Create a new corrective measure',

        'correctivemeasure.title': 'Corrective measure',
        'correctivemeasure.description.placeholder': 'Corrective measure description',
        'correctivemeasure.description.tooltip': 'Corrective measure description - field is required',
        'correctivemeasure.deadline': 'Implementation deadline',
        'correctivemeasure.deadline.tooltip': 'Date until which the measure should be implemented',

        'initial.panel-title': 'Initial reports',
        'initial.table-report': 'Report',
        'initial.wizard.add-title': 'Add initial report',
        'initial.wizard.edit-title': 'Edit initial report',
        'initial.label': 'Initial report',
        'initial.tooltip': 'Initial report text - this field is required',

        'report.summary': 'Report summary',
        'report.created-by-msg': 'Created {date} by {name}.',
        'report.last-edited-msg': 'Last modified {date} by {name}.',
        'report.narrative-tooltip': 'Narrative - this field is required',
        'report.table-edit-tooltip': 'Edit statement',
        'report.table-delete-tooltip': 'Delete statement',
        'report.corrective.panel-title': 'Corrective measures',
        'report.corrective.table-description': 'Corrective measure',
        'report.corrective.description-placeholder': 'Corrective measure description',
        'report.corrective.description-tooltip': 'Corrective measure description - field is required',
        'report.corrective.add-tooltip': 'Add a corrective measure',
        'report.corrective.wizard.title': 'Corrective Measure Wizard',
        'report.corrective.wizard.step-title': 'Corrective Measure Assessment',
        'report.corrective.evaluation.title': 'Implementation evaluation',
        'report.corrective.evaluation.evaluation': 'Evaluation',
        'report.corrective.evaluation.evaluation-notes': 'Evaluation notes',
        'report.eventtype.table-type': 'Event type',
        'report.eventtype.add-tooltip': 'Add an event type assessment',
        'report.organization': 'Organization',
        'report.responsible-department': 'Responsible department',
        'report.responsible-department.add-tooltip': 'Add another responsible department',

        'report.occurrence.category.label': 'Occurrence category',
        'occurrencereport.title': 'Occurrence report',
        'occurrencereport.label': 'Occurrence',
        'occurrencereport.create-safety-issue': 'Create safety issue',
        'occurrencereport.create-safety-issue-tooltip': 'Create safety issue based on this report',
        'occurrencereport.add-as-safety-issue-base': 'Add safety issue base',
        'occurrencereport.add-as-safety-issue-base-tooltip': 'Add this report as a base to a safety issue',
        'occurrencereport.add-as-safety-issue-base-placeholder': 'Safety issue name',
        'safetyissuereport.title': 'Safety issue report',
        'safetyissuereport.label': 'Safety issue',
        'safetyissue.based-on': 'Based on',
        'safetyissue.base-add-success': 'Safety issue base successfully added. Click \'Save\' to save changes.',
        'safetyissue.base-add-duplicate': 'Safety issue is already based on the specified report.',
        'auditreport.title': 'Audit report',
        'auditreport.label': 'Audit',

        'wizard.finish': 'Finish',
        'wizard.next': 'Next',
        'wizard.previous': 'Previous',
        'wizard.advance-disabled-tooltip': 'Some required values are missing',

        'eventtype.title': 'Event type',
        'eventtype.default.description': 'Description',
        'eventtype.default.description-placeholder': 'Event description',


        'factors.panel-title': 'Factors',
        'factors.scale': 'Scale',
        'factors.scale-tooltip': 'Click to select scale: {unit}',
        'factors.scale.second': 'Seconds',
        'factors.scale.minute': 'Minutes',
        'factors.scale.hour': 'Hours',
        'factors.scale.relative': 'Relative',
        'factors.scale.relative-tooltip': 'Click to select relative scale',
        'factors.link-type-select': 'Factor relationship type?',
        'factors.link-type-select-tooltip': 'Select link type',
        'factors.link.delete.title': 'Delete link?',
        'factors.link.delete.text': 'Are you sure you want to delete the link from {source} to {target}?',
        'factors.event.label': 'Event',
        'factors.detail.title': 'Factor assessment',
        'factors.detail.type': 'Type',
        'factors.detail.type-placeholder': 'Factor type',
        'factors.detail.time-period': 'Time period',
        'factors.detail.start': 'Start time',
        'factors.detail.duration': 'Duration',
        'factors.duration.second': '{duration, plural, one {second} other {seconds}}',
        'factors.duration.minute': '{duration, plural, one {minute} other {minutes}}',
        'factors.duration.hour': '{duration, plural, one {hour} other {hours}}',
        'factors.detail.details': 'Details',
        'factors.detail.delete.title': 'Delete factor?',
        'factors.detail.delete.text': 'Are you sure you want to remove this factor?',
        'factors.detail.wizard-loading': 'Generating form...',

        'notfound.title': 'Not found',
        'notfound.msg-with-id': '{resource} with id {identifier} not found.',
        'notfound.msg': '{resource} not found.',

        'notrenderable.title': 'Unable to display report',
        'notrenderable.error': 'Error: {message}',
        'notrenderable.error-generic': 'Please verify report validity.',

        'revisions.label': 'Revisions',
        'revisions.created': 'Created',
        'revisions.show-tooltip': 'Show this revision',
        'revisions.readonly-notice': 'Older revisions are read-only.',

        'sort.no': 'Click to sort records by this column',
        'sort.asc': 'Records are sorted in ascending order',
        'sort.desc': 'Records are sorted in descending order',

        // ----------- ARMS -------------
        'arms.title': 'ARMS',
        'arms.accident-outcome': 'Accident outcome',
        'arms.accident-outcome.tooltip': 'If this event had escalated into an accident, what would have been the most probable accident outcome?',
        'arms.barrier-effectiveness': 'Barrier effectiveness',
        'arms.barrier-effectiveness.tooltip': 'What was the effectiveness of the remaining barriers between this event and the most probable accident scenario?',
        'arms.index': 'ARMS index',
        'arms.index.tooltip': 'ARMS index is ',

        'statistics.type.general': 'General',
        'statistics.type.eventTypes': 'Event types',
        'statistics.type.audit': 'Audit'
    }
};

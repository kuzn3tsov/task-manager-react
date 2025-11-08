export const STORAGE_KEY = 'task-tracker:data:v1';
export const LANG_KEY = 'task-tracker:lang:v1';

export const DICT = {
    en: {
        appTitle: 'Task Tracker',
        appSubtitle: 'Organize your work and life',
        createList: 'Create New List',
        newListPlaceholder: 'New list name...',
        createTaskTitle: 'Create Task',
        taskTitlePlaceholder: 'Task title',
        taskDescPlaceholder: 'Description (optional)',
        taskPriorityLabel: 'Priority',
        priorityLow: 'Low',
        priorityMedium: 'Medium',
        priorityHigh: 'High',
        taskDueLabel: 'Due Date',
        save: 'Save',
        cancel: 'Cancel',
        activeTasks: 'Active Tasks',
        completedTasks: 'Completed Tasks',
        empty: 'No tasks here yet.',
        helpTitle: 'How to Use Task Tracker',
        helpItems: [
            'Create multiple task lists in the sidebar.',
            'Add new tasks with title, description and due date.',
            'Click the checkbox to mark tasks completed.',
            'Edit a task by clicking it. Delete with the trash icon.',
            'Switch language using the dropdown (EN/HR).',
            'All data is saved automatically in your browser.',
            'Set up email and SMS reminders for each task list.'
        ],
        helpTooltip: 'Help',
        closeText: 'Close',
        deleteConfirm: 'Delete this task?',
        deleteListConfirm: 'Delete this list and all its tasks?',
        editList: 'Edit List',
        deleteList: 'Delete List',
        defaultListName: 'New List',
        // New reminder texts
        reminders: 'Reminders',
        emailReminders: 'Email Reminders',
        smsReminders: 'SMS Reminders',
        emailAddress: 'Email Address',
        phoneNumber: 'Phone Number',
        enableEmail: 'Enable Email Reminders',
        enableSMS: 'Enable SMS Reminders',
        reminderSettings: 'Reminder Settings',
        dailyDigest: 'Daily Digest',
        taskDue: 'When Task is Due',
        reminderTime: 'Reminder Time',
        saveReminders: 'Save Reminders',
        testEmail: 'Test Email',
        testSMS: 'Test SMS',
        remindersSaved: 'Reminder settings saved!',
        testSent: 'Test message sent!',
        enterValidEmail: 'Please enter a valid email address',
        enterValidPhone: 'Please enter a valid phone number',
        reminderDesc: 'Get notified about upcoming and overdue tasks'
    },
    hr: {
        appTitle: 'Task Tracker',
        appSubtitle: 'Organiziraj posao i život',
        createList: 'Nova lista',
        newListPlaceholder: 'Naziv nove liste...',
        createTaskTitle: 'Novi zadatak',
        taskTitlePlaceholder: 'Naslov zadatka',
        taskDescPlaceholder: 'Opis (opcionalno)',
        taskPriorityLabel: 'Prioritet',
        priorityLow: 'Nizak',
        priorityMedium: 'Srednji',
        priorityHigh: 'Visok',
        taskDueLabel: 'Rok',
        save: 'Spremi',
        cancel: 'Odustani',
        activeTasks: 'Aktivni zadaci',
        completedTasks: 'Dovršeni zadaci',
        empty: 'Nema zadataka.',
        helpTitle: 'Kako koristiti Task Tracker',
        helpItems: [
            'Kreiraj više lista zadataka u bočnoj traci.',
            'Dodaj nove zadatke s naslovom, opisom i rokom.',
            'Klikni kvačicu da označiš zadatak dovršenim.',
            'Uredi zadatak klikom na njega. Izbriši ikonom za smeće.',
            'Promijeni jezik pomoću izbornika (EN/HR).',
            'Svi se podaci automatski spremaju u preglednik.',
            'Postavi email i SMS podsjetnike za svaku listu zadataka.'
        ],
        helpTooltip: 'Pomoć',
        closeText: 'Zatvori',
        deleteConfirm: 'Izbrisati ovaj zadatak?',
        deleteListConfirm: 'Izbrisati ovu listu i sve njene zadatke?',
        editList: 'Uredi Listu',
        deleteList: 'Izbriši Listu',
        defaultListName: 'Nova Lista',
        // New reminder texts
        reminders: 'Podsjetnici',
        emailReminders: 'Email Podsjetnici',
        smsReminders: 'SMS Podsjetnici',
        emailAddress: 'Email Adresa',
        phoneNumber: 'Broj Telefona',
        enableEmail: 'Omogući Email Podsjetnike',
        enableSMS: 'Omogući SMS Podsjetnike',
        reminderSettings: 'Postavke Podsjetnika',
        dailyDigest: 'Dnevni Pregled',
        taskDue: 'Kada Zadatak Istječe',
        reminderTime: 'Vrijeme Podsjetnika',
        saveReminders: 'Spremi Podsjetnike',
        testEmail: 'Testiraj Email',
        testSMS: 'Testiraj SMS',
        remindersSaved: 'Postavke podsjetnika spremljene!',
        testSent: 'Test poruka poslana!',
        enterValidEmail: 'Unesite valjanu email adresu',
        enterValidPhone: 'Unesite valjani broj telefona',
        reminderDesc: 'Primajte obavijesti o nadolazećim i zakasnjelim zadacima'
    }
};

export const PRIORITIES = [
    { value: 'low', label: { en: 'Low', hr: 'Nizak' } },
    { value: 'medium', label: { en: 'Medium', hr: 'Srednji' } },
    { value: 'high', label: { en: 'High', hr: 'Visok' } }
];

export const REMINDER_TYPES = [
    { value: 'daily', label: { en: 'Daily Digest', hr: 'Dnevni Pregled' } },
    { value: 'due', label: { en: 'When Task is Due', hr: 'Kada Zadatak Istječe' } }
];

export const REMINDER_TIMES = [
    { value: '09:00', label: '9:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '18:00', label: '6:00 PM' }
];
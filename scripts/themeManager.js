import CONFIG from './config.js';

export class ThemeManager {
    constructor() {
        this.themeKey = CONFIG.theme.key;
        this.darkMode = CONFIG.theme.modes.dark;
        this.lightMode = CONFIG.theme.modes.light;
        this.init();
    }

    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem(this.themeKey);
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // If no saved preference, check system preference
            document.documentElement.setAttribute('data-theme', this.darkMode);
        }

        // Setup theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => this.handleSystemThemeChange(e));
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === this.darkMode ? this.lightMode : this.darkMode;
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(this.themeKey, newTheme);
    }

    handleSystemThemeChange(e) {
        // Only change theme if user hasn't set a preference
        if (!localStorage.getItem(this.themeKey)) {
            const newTheme = e.matches ? this.darkMode : this.lightMode;
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    }
}

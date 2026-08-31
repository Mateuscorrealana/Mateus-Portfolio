/* =========================================================
   Mateus Correa Lana — Portfólio
   Navegação + idioma + menu mobile
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initNavToggle();
    initLangToggle();

});

const welcomeBtn = document.getElementById("welcomeBtn");

welcomeBtn.addEventListener("click", () => {
    document.getElementById("sobre").scrollIntoView({
        behavior: "smooth"
    });
});


/* =========================================================
   MENU MOBILE
========================================================= */

function initNavToggle() {

    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    if (!toggle || !links) return;


    const closeMenu = () => {

        links.classList.remove("is-open");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    };


    toggle.addEventListener("click", () => {

        const isOpen =
            links.classList.toggle("is-open");

        toggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    links
        .querySelectorAll(".nav-link")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    document.addEventListener("click", (event) => {

        if (!links.classList.contains("is-open")) {
            return;
        }

        const clickedInside =
            links.contains(event.target) ||
            toggle.contains(event.target);

        if (!clickedInside) {
            closeMenu();
        }

    });

}


/* =========================================================
   IDIOMA PT / EN
========================================================= */

function initLangToggle() {

    const toggle =
        document.getElementById("langToggle");

    if (!toggle) return;


    const saved =
        window.localStorage.getItem(
            "portfolio-lang"
        );


    let currentLang =
        saved === "en" ? "en" : "pt";


    applyLang(currentLang);


    toggle.addEventListener("click", () => {

        currentLang =
            currentLang === "pt"
                ? "en"
                : "pt";


        applyLang(currentLang);


        window.localStorage.setItem(
            "portfolio-lang",
            currentLang
        );

    });

}


/* =========================================================
   APLICAR IDIOMA
========================================================= */

function applyLang(lang) {

    document.documentElement.lang =
        lang === "en"
            ? "en"
            : "pt-BR";


    document
        .querySelectorAll(
            "[data-pt][data-en]"
        )
        .forEach((el) => {

            const text =
                lang === "en"
                    ? el.dataset.en
                    : el.dataset.pt;


            if (text) {
                el.textContent = text;
            }

        });


    document
        .querySelectorAll(".lang-option")
        .forEach((option) => {

            option.classList.toggle(
                "is-active",
                option.dataset.lang === lang
            );

        });


    const toggle =
        document.getElementById("langToggle");


    if (toggle) {

        toggle.setAttribute(
            "aria-label",
            lang === "en"
                ? "Switch language"
                : "Alternar idioma"
        );

    }

}
import gsap from "gsap";

export const useHomeAnimations = () => {
    
    /* Transition GSAP */
    const beforeEnter = (el) => {
        el.style.opacity = 0;
    };

    const onEnter = (el, done) => {
        gsap.to(el, { opacity: 1, duration: 1, ease: "power3.Out", onComplete: done });
    };

    /* ---------- Enter ---------- */
    const indexmotion = () => {
        const tl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
        tl.from("#index-name", { opacity: 0, yPercent: 65, stagger: 0.05 }, 0.1);
        tl.from(".index-name-text", { opacity: 0, yPercent: 65, stagger: 0.05 }, 0.1);
        tl.from(".index-text-span", { opacity: 0, yPercent: 20, stagger: 0.02 }, 0.6);
        tl.from(".index-btnarea", { opacity: 0, yPercent: 65 }, 1.1);
    };

    /* Loading */
    const loadingLeave = (el, done) => {
        const tl = gsap.timeline();
        tl.to(
            "#index-logo",
            { filter: "blur(60px)", fill: "#FFF", duration: 2, ease: "power3.Out" },
            0.7,
        );
        tl.to(
            el,
            { opacity: 0, duration: 0.75, ease: "power3.Out", onComplete: done, onStart: indexmotion },
            1,
        );
    };

    return {
        beforeEnter,
        onEnter,
        loadingLeave,
        indexmotion
    };
};

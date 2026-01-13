import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const useProjectItemAnimations = () => {

    /* Desktop animation */
    const setupDesktopAnimations = (matchmedia) => {
        matchmedia.add("(min-width: 768px)", () => {
            gsap.to(".parallax", {
                scrollTrigger: { trigger: ".head-img-container", start: "clamp(top bottom)", end: "bottom 50px", scrub: 0.5 },
                yPercent: -16,
            });
        });
    };

    const animateHero = () => {
        // Hero GSAP
        const herotl = gsap.timeline({
            scrollTrigger: {
                trigger: ".workitem-info",
                start: "top 80%",
                end: "bottom 30%",
                // markers: true,
            },
            defaults: { ease: "back.inOut(1.7)", duration: 0.8 },
        });
        herotl.from("#prj-name", { opacity: 0, yPercent: 50, rotationX: 90, stagger: 0.05 });
        herotl.from(".hero-2", { opacity: 0, yPercent: 40, rotationX: 90, stagger: 0.25 }, 0.1);
        herotl.from(".hero-social", { opacity: 0, yPercent: 30, scale: 0.1, duration: 0.5, stagger: 0.25 }, 0.65);
        herotl.from(".hero-3", { opacity: 0, yPercent: 50, rotationX: 90 }, 0.6);
        herotl.from(".hero-4", { opacity: 0, yPercent: 25, rotationX: 90, ease: "power3.Out(1.7)", stagger: 0.25 }, 0.65);
        herotl.from(".hero-sep", { scaleX: 0, ease: "power3.Out(1.7)", stagger: 0.25 }, 0.8);
        herotl.from(".head-img-container", { clipPath: "inset(0 100% 0 0)", duration: 2.5, ease: "expo.out" }, 0.7);
        herotl.from("#content-context", { opacity: 0, yPercent: 25, ease: "power3.Out(1.7)", stagger: 0.1 }, 1.1);
    };

    const animateImgTrigger = () => {
        gsap.utils.toArray(".prj-img").forEach((layer) => {
            gsap.from(layer, { scrollTrigger: { trigger: layer, start: "clamp(top 65%)" }, opacity: 0, yPercent: 10, duration: 0.8 });
        });
    };

    /* Credit */
    const animateCredit = () => {
        const credittl = gsap.timeline({
            scrollTrigger: { trigger: ".workitem-credit", start: "top 65%" },
            defaults: { ease: "back.inOut(1.7)", duration: 0.8 },
        });
        credittl.from(".credit-title", { opacity: 0, yPercent: 50 });
        credittl.from(".credit-text", { opacity: 0, yPercent: 50, stagger: 0.06 }, 0.2);
    };

    return {
        setupDesktopAnimations,
        animateHero,
        animateImgTrigger,
        animateCredit
    };
};

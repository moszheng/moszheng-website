import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const useProjectAnimations = (imgContainer) => {
    
    // Desktop Parallax
    const setupDesktopAnimations = (matchmedia) => {
        matchmedia.add("(min-width: 1024px)", (context) => {
            /* ----------- Depth --------------- */
            gsap.utils.toArray(".parallax").forEach((layer, index) => {
                const rand = [1, 0.8, 0.7];
                const movement = -15 * rand[index % 3];
                gsap.to(layer, {
                    scrollTrigger: {
                        trigger: ".works",
                        start: "clamp(top top)",
                        end: "bottom 30%",
                        // markers: true,
                        scrub: 0.75,
                    },
                    yPercent: movement,
                    ease: "none",
                });
            });
        });
    };

    const animateHero = () => {
         const herotl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
         herotl.from(".card", { opacity: 0, yPercent: 65, scaleY: 1.1, scaleX: 0.95, stagger: 0.05 });
         herotl.from(".work-mobile-title", { opacity: 0, yPercent: 65, stagger: 0.05 }, 0.1);
    };

    const animateLeave = () => {
        const herotl = gsap.timeline({});
        // herotl.to(".card", { xPercent: -250, scaleY: 0.4, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.02 });
        herotl.to(".work-mobile-title", { xPercent: -150, ease: "back.inOut(1.7)", duration: 0.5, stagger: 0.2 }, 0.2);
    };

    return {
        setupDesktopAnimations,
        animateHero,
        animateLeave
    };
};

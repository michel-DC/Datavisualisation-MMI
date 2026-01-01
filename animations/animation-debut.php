<style>
    .climate-gradient {
        background: #1E1E1E;
        background-size: 400% 400%;
        animation: climateShift 12s ease infinite;
    }

    @keyframes climateShift {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }
</style>

<div id="entry-container" class="entry-container fixed inset-0 z-[100] pointer-events-none overflow-hidden">
    <div class="entry-overlay climate-gradient absolute inset-0 flex items-center justify-center pointer-events-auto">
        <h3 class="entry-text text-7xl font-bold text-white text-center px-6">
            Le changement climatique en Guadeloupe
        </h3>
    </div>
</div>


<script>
    document.addEventListener("DOMContentLoaded", function() {
        const tl = gsap.timeline();

        // État initial
        tl.set(".entry-text", {
                opacity: 0,
                y: 20
            })
            .set(".entry-overlay", {
                yPercent: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            })

            // Animation du texte
            .to(".entry-text", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
            })
            .to(".entry-text", {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power3.in",
                delay: 0.3,
            })

            // Animation de sortie (Slide up circulaire)
            .to(".entry-overlay", {
                yPercent: -100,
                borderBottomLeftRadius: "50%",
                borderBottomRightRadius: "50%",
                duration: 0.8,
                ease: "power2.inOut",
            })

            // Nettoyage (display: none pour ne plus bloquer les clics)
            .set(".entry-container", {
                display: "none"
            });
    });
</script>
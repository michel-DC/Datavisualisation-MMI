<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    lucide.createIcons();
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

    @font-face {
        font-family: 'Cabinet Grotesk';
        src: url('assets/fonts/cabinet/CabinetGrotesk-Regular.woff2') format('woff2'),
            url('assets/fonts/cabinet/CabinetGrotesk-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Cabinet Grotesk';
        src: url('assets/fonts/cabinet/CabinetGrotesk-Bold.woff2') format('woff2'),
            url('assets/fonts/cabinet/CabinetGrotesk-Bold.woff') format('woff');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'Cabinet Grotesk';
        src: url('assets/fonts/cabinet/CabinetGrotesk-Extrabold.woff2') format('woff2'),
            url('assets/fonts/cabinet/CabinetGrotesk-Extrabold.woff') format('woff');
        font-weight: 800;
        font-style: normal;
    }

    @font-face {
        font-family: 'Cabinet Grotesk';
        src: url('assets/fonts/cabinet/CabinetGrotesk-Black.woff2') format('woff2'),
            url('assets/fonts/cabinet/CabinetGrotesk-Black.woff') format('woff');
        font-weight: 900;
        font-style: normal;
    }


    body {
        font-family: 'Montserrat', sans-serif;
        /* background-image: url('assets/images/fond.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat; */
    }

    h1,
    h2,
    h3 {
        font-family: 'Cabinet Grotesk', sans-serif;
    }
</style>

<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#3b82f6',
                },
                fontFamily: {
                    sans: ['Montserrat', 'sans-serif'],
                    display: ['Cabinet Grotesk', 'sans-serif'],
                }
            }
        }
    }
</script>
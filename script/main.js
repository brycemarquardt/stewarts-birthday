// Enhanced version with cascading (micro-delayed) arrival effect

const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];
    const birthdaySong = document.querySelector('.birthday-song');

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    };

    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible",
        onStart: () => {
            try {
                birthdaySong.volume = 1;
                birthdaySong.play();
            } catch (error) {
                console.error("Error playing birthday song:", error);
            }
        }
    })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".idea-1", 0.7, ideaTextTrans)
    .from(".text-box", 0.3, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.028)
    .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" }, "+=1.9")
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-combined", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff"
    }, "+=0.5")
    .to(".idea-combined", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".reason-special", 0.7, ideaTextTrans)
    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
    .to(".reason-special", 0.7, ideaTextTransLeave, "+=2")
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)

    // --- Cascading effect for arrival of profile picture, heading, and wish text ---
    .add("sixArrival", "-=6")
    .from(".profile-picture", 1, {
        opacity: 0,
        y: -50,
        scale: 1.5,
        rotationZ: -15,
        ease: Elastic.easeOut.config(1, 0.5)
    }, "sixArrival")
    .staggerFrom([".wish-hbd span", ".wish h5"], 0.8, {
        opacity: 0,
        y: -30,
        scale: 1.2,
        rotationZ: 15,
        ease: Elastic.easeOut.config(1, 0.5)
    }, 0.2, "sixArrival")
    // --- END Cascading group ---

    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" }, "+=5")
    .from(".video-display", 1, { opacity: 0, visibility: "hidden" })
    .to(".video-display", 1, {
        opacity: 1,
        visibility: "visible",
        onStart: () => {
            try {
                document.querySelector('.team-video').play();
            } catch (error) {
                console.error("Error playing team video:", error);
            }
        }
    })
    .to(birthdaySong, 1, { volume: 0, ease: Linear.easeNone }, "+=7"); // Fade song 7s after video starts
};

// Start button event listener
document.getElementById('start-btn').addEventListener('click', () => {
    document.querySelector('.start-screen').style.display = 'none';
    animationTimeline();
});

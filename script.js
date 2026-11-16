/*sky*/
const sky = document.getElementById("sky");
const ctx = sky.getContext("2d");
let stars = [];

function makeStars() {
    sky.width = window.innerWidth;
    sky.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 220; i++) {
        stars.push({
            x: Math.random() * sky.width,
            y: Math.random() * sky.height,
            size: Math.random() * 1.4 + 0.3,
            speed: Math.random() * 1.5 + 0.5,
            phase: Math.random() * 6.28
        });
    }
}

let shooters = [];

function drawStars(time) {
    ctx.clearRect(0, 0, sky.width, sky.height);

    stars.forEach(function (star) {
        const alpha = 0.55 + 0.45 * Math.sin(time / 1000 * star.speed + star.phase);
        ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // sometimes, a new shooting star
    if (Math.random() < 0.003) {
        shooters.push({
            x: Math.random() * sky.width,
            y: Math.random() * sky.height * 0.4,
            vx: 7,
            vy: 3,
            life: 40
        });
    }

    shooters = shooters.filter(function (s) { return s.life > 0; });
    shooters.forEach(function (s) {
        ctx.strokeStyle = "rgba(255, 255, 255, " + s.life / 40 + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life--;
    });

    requestAnimationFrame(drawStars);
}

makeStars();
drawStars(0);
window.addEventListener("resize", makeStars);

function go(id) {
    document.querySelectorAll(".screen").forEach(function (s) { s.classList.remove("opened"); });
    document.querySelectorAll(".screen").forEach(function (screen) {
        screen.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

document.getElementById("enter").onclick = function () {
    go("menu");
    playMusic();
};

document.addEventListener("click", function (event) {
    const target = event.target.closest("[data-go]");
    if (target) go(target.dataset.go);
});

/*sad*/
document.querySelectorAll(".env").forEach(function (env) {
    env.onclick = function () {
        env.parentElement.classList.add("opened");
    };
});

const LETTERS = {
    sad: {
        title: "When you're sad...",
        cards: [
            { name: "Card 1", title: "Hi baby", text: `I wish I could take away everything that is making your heart feel heavy. I wish I could make the world a little softer for you and remind you that not every day has to be a good day. You are allowed to feel tired, you are allowed to have bad days, and you are allowed to not have everything figured out` },
            { name: "Card 2", title: "حبيبي", text: `بس بدي إياك تتذكر إنو مهما صار، إنت مش لحالك. الله معك بكل خطوة، وأنا معك و بدعيلك من كل قلبي.` },
            { name: "Card 3", title: "قطعة من قلبي", text: `نت إنسان غالي كتير، وقيمتك مش مرتبطة بأي شي بتعمله أو بتحققه. إنت كفاية متل ما إنت` },
            { name: "Card 4", title: "Remember...", text: `I'm proud of you, not just for what you accomplish, but for the person you are becoming. Never let one difficult chapter make you forget how beautiful your whole story is.` },
            { name: "Card 5", title: "سعادتي", text: `اللهم إني أستودعك قلبه ونفسه وأيامه، فاحفظه بعينك التي لا تنام.` },
            { name: "Card 6", title: "دلع قلبي", text: `اللهم أبعد عنه الحزن والهم، وارزقه راحة البال وطمأنينة القلب، وافتح له أبواب الخير من حيث لا يحتسب.` },
            { name: "Card 7", title: "ملاكي", text: `اللهم إن كان في قلبه ضيق فوسّعه، وإن كان في طريقه عسر فيسّره، وإن كان ينتظر فرحاً فبشّره بما يتمنى.` },
            { name: "Card 8", title: "I am always here", text: `I hope you always feel safe enough to be yourself with me. You never have to pretend that everything is okay.` },
            { name: "Card 9", title: "سكرتي", text: ` ما أخّره الله عنك إلا لحكمة، وما كتبه لك سيأتيك في وقته.
قال الله تعالى: ﴿فَإِنَّ مَعَ الْعُسْرِ يُسْرًا﴾` },
            { name: "Card 10", title: "دنيتي الحلوة", text: `إنت بتقدر، وإن شاء الله ربنا رح يفتحلك أبواب ما كنت متخيّلها. ما توقف عن المحاولة` },
            { name: "Card 11", title: "روح الروح", text: `حبيبي، مهما كانت الدنيا صعبة، لا تنسى إنك دايماً بتقدر ترجع لربنا.` },
            { name: "Card 12", title: "اميري الحلو", text: `بدعي ربنا يريح بالك، ويوفقك، ويحميك من كل شر، ويبعد عنك كل شي ممكن يوجع قلبك.` },
            { name: "Card 13", title: "فرحة عمري", text: `يوسف انا فخورة فيك و على طول حكون فخورة فيك واثقة فيك انك حتوصل للي بتتمناه و اكتر` },
            { name: "Card 14", title: "اغلى الناس", text: `اللهم إني أسألك راحةً تسكن بها نفسه، وطمأنينةً تملأ بها قلبه، وفرحاً يمحو عنه تعب الأيام.` },
            { name: "Card 15", title: "كل دنيتي", text: `اللهم لا تجعل في قلبه حزناً إلا أزلته، ولا هماً إلا فرّجته، ولا أمراً عسيراً إلا يسّرته.` },
            { name: "Card 16", title: "سندي واماني", text: `اللهم أبعد عنه كل شر، واكتب له السلامة والتوفيق، واجعل عنايتك تحيط به أينما كان.` },
            { name: "Card 17", title: "ونسي", text: `اللهم أبعد عنه الحزن والهم، وارزقه راحة البال وطمأنينة القلب، وافتح له أبواب الخير من حيث لا يحتسب.` },
            { name: "Card 18", title: "قطعة من قلبي", text: `اللهم إن كان في قلبه ضيق فوسّعه، وإن كان في طريقه عسر فيسّره، وإن كان ينتظر فرحاً فبشّره بما يتمنى.` },
            { name: "Card 19", title: "I love u", text: `I hope you always feel safe enough to be yourself with me. You never have to pretend that everything is okay.` },
            { name: "Card 20", title: "نور عيوني", text: ` ما أخّره الله عنك إلا لحكمة، وما كتبه` },
            { name: "Card 21", title: "نبض قلبي", text: `إنت بتقدر، وإن شاء الله ربنا رح يفتحلك أبواب ما كنت متخيّلها. ما توقف عن المحاولة` },
            { name: "Card 22", title: "حبيب الروح", text: `حبيبي، مهما كانت الدنيا صعبة، لا تنسى إنك دايماً بتقدر ترجع لربنا.` },
            { name: "Card 23", title: "بعشقك", text: `بدعي ربنا يريح بالك، ويوفقك، ويحميك من كل شر، ويبعد عنك كل شي ممكن يوجع قلبك.` },
            { name: "Card 24", title: "بحبك", text: `يوسف انا فخورة فيك و على طول حكون فخورة فيك واثقة فيك انك حتوصل للي بتتمناه و اكتر` },

  {
    name: "Card 9",
    title: "خد بالك من حالك",
    text: `بيبي، ارتاح شوي. مش مطلوب منك تكون منتج كل يوم ولا تتحمل كل شي لحالك. من حقك تتعب ومن حقك تاخد وقت لنفسك. يا حياتي دير بالك على حالك مثل ما بتدير بالك على كل شي حواليك.`
  },

  {
    name: "Card 14",
    title: "حلمي انت",
    text: `بيبي، مش كل احتمال لازم تخاف منه ومش كل فكرة لازم تصدقها. احيانا بنحتاج نترك الامور لربنا ونريح عقلنا شوي. يا روحي لا تخلي تفكيرك يسرق منك حلاوة يومك.`
  },
 
  {
    name: "Card 22",
    title: "حياتي انت",
    text: `يا حبيبي، بتمنى هالكلمات توصلك كأنها حضن دافي. ما لازم تكون قوي طول الوقت ومن حقك تتعب وتطلب الدعم. اللهم ارح قلبه واغمره برحمتك وانزل عليه من لطفك ما يطمئن روحه. يا عمري بتمنى اقدر اخلي كل شي حواليك اهدأ واحلى.`
  },

  {
    name: "Card 26",
    title: "عادي تحس حالك ضايع",
    text: `حبيبي، اذا مش عارف وين تروح او شو تعمل، وقف شوي وادعي ربنا يهديك للطريق الصح. مش لازم تعرف كل شي اليوم. اللهم اهد قلبه ونور بصيرته واختر له الخير ويسر له الطريق الذي فيه صلاحه. يا بيبي حتى لو الطريق مش واضح، خذ خطوة صغيرة وربنا بيسهلها.`
  },

  {
    name: "Card 29",
    title: "خفف على نفسك",
    text: `بيبي، خفف عن حالك شوي. مش لازم تحمل كل المسؤوليات بنفس اللحظة. رتب افكارك وخذ نفس وربنا بيسهلها باذنه. اللهم يسر اموره وبارك في وقته وابعد عنه الضغط والقلق. يا روحي انا فخورة بكل مجهود بتعمله حتى لو ما حدا شافه.`
  },
  {
    name: "Card 30",
    title: "افتحها لما تحتاج بداية جديدة",
    text: `حبيبي، كل يوم جديد فرصة نبدأ من اول وجديد ونتعلم من اللي فات من دون ما نظل نلوم حالنا. اللهم افتح له صفحة جديدة مليئة بالخير ووفقه لما تحب وترضى. تذكر يا سفسوف انك دايما بتقدر تبدأ من جديد وان ربنا رحمته واسعة.`
  },

  {
    name: "Card 32",
    title: "سلم امرك لله",
    text: `حبيبي، مش كل شي بايدنا ومش كل شي لازم نضل نحاول نسيطر عليه. احيانا الراحة بتبدأ لما نسلم امرنا لربنا ونثق بتدبيره. اللهم دبر له امره واختر له ما فيه الخير ويسر له كل عسير. ريح بالك يا روحي وخلي ثقتك بربنا اكبر من خوفك.`
  },
  {
    name: "Card 33",
    title: "انا بعشق ثقتك بنفسك",
    text: `يا سفسوف، سامح حالك. كلنا بنغلط وكلنا بنتعلم. لا تضل تعاقب نفسك على شي صار وانتهى. استغفر ربك وتعلم وكمل بقلب اهدأ. اللهم اغفر له ووفقه للاصلاح وارزقه قلبا مطمئنا. انت بتستحق فرصة جديدة وبتستحق تكون حنون على نفسك يا حبيبي.`
  },

  {
    name: "Card 35",
    title: "سفسوفتي",
    text: `يا عشقي، بدي اشكرك لانك انت ولانك موجود ولانك بتضيف لحياتي اشياء حلوة يمكن ما بتنتبه الها. بحب تفاصيلك وبقدر تعبك وبحب اسمع عن يومك حتى لو كان مليان اشياء عادية. وجودك نعمة بحمد ربنا عليها.`
  },

  {
    name: "Card 37",
    title: "حبقى جنبك ف يوم اسندك",
    text: `في تعب ما بيبان على الوجه وفي هموم ما بيعرفها الا ربنا. يا حبيبي خليك حنون على قلبك. مش لازم تفسر لكل الناس شو عم تحس. اللهم ارح روحه وخفف عنه ما لا يعلمه سواك وارزقه سكينة من عندك. بتمنى تلاقي دايما مكان ترتاح فيه وتكون على طبيعتك يا روحي.`
  },
  {
    name: "Card 38",
    title: "بطلي انت",
    text: `يا سفسوف، لا تنسى الاحلام اللي كنت تحكيلي عنها ولا تتخلى عن الاشياء اللي بتتمنى تحققها. خذ وقتك وتقدم على مهلك وربنا بيسهل. اللهم حقق له ما فيه الخير وبارك في طموحه وافتح له ابواب النجاح. يا حبيبي انا رح اضل ادعيلك واشجعك بكل خطوة.`
  },
  {
    name: "Card 39",
    title: "بمووت فيككك",
    text: `حياتي، بهمني تكون بخير حتى بالايام اللي ما بتحكي فيها عن تعبك. بدي اياك تعرف انو مشاعرك الها مكان وانك بتستحق الاهتمام والحنية. اللهم ارزقه المحبة الصادقة والصحبة الطيبة والقلوب التي تخاف عليه. يا عمري انت مهم وغالي ووجودك بيفرق اوي اويي`
  },
  {
    name: "Card 40",
    title: "اطمن يدنيتي انت",
    text: `يا رب احفظه من كل خوف وكن له سندا وعونا وابعد عنه كل ما يقلق قلبه. حبيبي، بتمنى تكون ايامك مليانة امان وطمأنينة وتعرف انك مش مجبور تواجه كل شي لحالك. اللهم اني استودعك اياه فاحفظه بعينك التي لا تنام. يا روحي الله يحميك وين ما كنت.`
  },

  {
    name: "Card 43",
    title: "يا اجمل حاجة في سنيني",
    text: `يا عمري، بتمنى اليوم يصير اخف عليك وتلاقي سبب صغير يفرح قلبك. يمكن كلمة حلوة او خبر منيح او لحظة هدوء. اللهم ارزقه فرحا قريبا وبشائر جميلة واياما مليئة بلطفك. بتمنى اشوفك مبسوط من قلبك يا سفسوف.`
  },
  {
    name: "Card 44",
    title: "اجيبك ف حضني ",
    text: `حبيبي، خذ كل شي بوقته. مش لازم تكون مسؤول عن كل شي بنفس اللحظة ومش مطلوب منك تحمل الدنيا كلها. اللهم اعنه على مسؤولياته وبارك له في جهده ويسر له ما استعصى عليه. دير بالك على حالك يا روحي وخلي لنفسك وقت ترتاح فيه.`
  },
  {
    name: "Card 45",
    title: "انت راىع",
    text: `تطلع لورا شوي يا حبيبي وتذكر كل الاشياء اللي قدرت تتجاوزها. يمكن وقتها كنت مفكر انك مش رح تقدر، بس ها انت هون. الحمد لله على قوتك وعلى كل خطوة مشيتها. اللهم بارك له فيما مضى ويسر له ما هو آت واجعل القادم اجمل. انا فخورة فيك يا عشقي.`
  },
  {
    name: "Card 46",
    title: "كن مع ربنا",
    text: `ارجع لربنا يا حبيبي حتى لو بخطوة صغيرة. ركعتين واستغفار ودعاء من قلبك. لا تستحي ترجع لله مهما قصرت. اللهم ثبت قلبه على دينك وحبب اليه الايمان وزينه في قلبه واهده الى صراطك المستقيم. يا رب يكون ايمانك دايما نور لطريقك وراحة لقلبك.`
  },
  {
    name: "Card 47",
    title: "حبيبي الصغنون",
    text: `سفسوفي، بحبك لما تكون مبسوط وبحبك لما تكون تعبان. بحب احكي معك واسمع تفاصيل يومك وبحب وجودك بحياتي. ما لازم تكون بأفضل حالاتك حتى تستحق الحنية. اللهم ادم عليه الخير واحفظ قلبه من الحزن وارزقه السعادة. يا روحي انت غالي علي بكل حالاتك.`
  },
  {
    name: "Card 48",
    title: "بركة",
    text: `اللهم بارك له في عمره وصحته ووقته ورزقه وعلمه وعمله. اللهم اجعل الخير يرافقه اينما ذهب واكتب له التوفيق في كل خطوة وابعد عنه كل ما لا خير فيه. حبيبي، بتمنى ربنا يباركلك بكل شي بتحبه وبتسعى اله ويعطيك اكتر مما تتمنى.`
  },
  {
    name: "Card 49",
    title: "بكرا احلى",
    text: `يا حبيبي، ربنا اللي كان معك بكل الايام الماضية رح يكون معك بكل خطوة جاية. ما بتعرف شو مخبيلك المستقبل بس بتقدر تحسن الظن بالله. اللهم اجعل مستقبله اجمل مما يتمنى واكتب له الخير والتيسير والرضا. يا رب يكون بكرا بداية لفرحة كبيرة بقلبك يا عمري.`
  },
  {
    name: "Card 50",
    title: "بحبك",
    text: `حبيبي، اذا وصلت لهالرسالة بدي اياك تعرف انو كل كلمة كتبتها هون طالعة من قلبي. يمكن ما بقدر امنع عنك كل حزن وما بقدر اخلي كل ايامك سهلة، بس بقدر ادعيلك واذكرك انك شخص غالي كتير.

اللهم اني استودعك قلبه فلا تريني فيه حزنا الا ازلته ولا ضيقا الا فرجته ولا تعبا الا ابدلته راحة. اللهم احفظه واسعده ووفقه واجبر خاطره وارزقه راحة البال في الدنيا والاخرة.

يا رب تكون ايامك القادمة احن عليك من كل الايام اللي تعبت فيها. ويا رب تضل ضحكتك منورة وجهك وقلبك.

بحبك بأيامك الحلوة وبأيامك الصعبة. تذكر دايما انك تستحق الفرح والراحة والحب، وانك غالي على قلبي اكتر مما بتتخيل.

الحمد لله انك بحياتي يا عشقي، والله يحفظك الي ويسعد قلبك دايما.`
  }
]

    },
    happy: {
        title: "When you're happy...",
        cards: [

  { name: "Card 1", title: "يا فرحة قلبي", text: `يا بيبي ضحكتك لحالها بتخليني مبسوطة الله يديمها عليك وما يحرمني من فرحتك` },

  { name: "Card 2", title: "تستاهل الفرح", text: `حبيبي انت بتستاهل كل شي حلو بالدنيا الله يحققلك كل امنياتك ويزيد ايامك فرح` },

  { name: "Card 3", title: "فخورة فيك", text: `سفسوفي انا فخورة فيك وبكل شي بتعمله لا تشكك بحالك ابدا انت قدها` },

  { name: "Card 4", title: "ضحكتك غير", text: `يا روحي ضحكتك من احلى الاشياء اللي بحب اشوفها الله لا يغير عليك الا للاجمل` },

  { name: "Card 5", title: "احلى صدفة", text: `من بين كل الناس انت كنت احلى صدفة واحلى نصيب بحياتي بحبك يا عمري` },

  { name: "Card 6", title: "يومك الحلو", text: `بتمنى كل يوم بحياتك يكون مليان اشياء بتفرح قلبك وناس بتحبك قد ما بتستاهل` },

  { name: "Card 7", title: "يا محظوظ قلبي", text: `انا المحظوظة فيك يا حبيبي وجودك بحياتي نعمة بحمد ربي عليها كل يوم` },

  { name: "Card 8", title: "خبر حلو", text: `عندي خبر حلو الك وهو انك لسا احلى شخص بعيوني ولسا قلبي بيختارك كل يوم` },

  { name: "Card 9", title: "ابتسم اكثر", text: `ابتسم يا بيبي لانك بتستاهل الدنيا كلها تكون لطيفة معك` },

  { name: "Card 10", title: "يا كل الحلا", text: `يا سفسوفي انت حلا ايامي وفرحة قلبي والسبب اللي بخليني ابتسم بدون سبب` },

  { name: "Card 11", title: "نجاحك فرحتي", text: `كل نجاح بتحققه بفرحني كأنه نجاحي انا الله يفتحها بوجهك دايما` },

  { name: "Card 12", title: "دعوة من قلبي", text: `الله يديم عليك الفرح وراحة البال ويكتبلك من الخير اكثر مما بتتمنى` },

  { name: "Card 13", title: "حلو وجودك", text: `حياتي وجودك لحاله كفاية يخلي ايامي احلى بحبك وبحب كل تفصيلة فيك` },

  { name: "Card 14", title: "انت قدها", text: `حبيبي لا تنسى قديش انت شاطر وقوي وقديش عندك اشياء حلوة تستاهل تفتخر فيها` },

  { name: "Card 15", title: "فرحتي فيك", text: `ما في شي احلى عندي من اني اشوفك مبسوط ومرتاح الله يخليلي قلبك الحلو` },

  { name: "Card 16", title: "يا قمري", text: `حتى وانت فرحان بتضل احلى شخص بالدنيا بعيوني يا قمر قلبي` },

  { name: "Card 17", title: "كل يوم بختارك", text: `لو خيروني بين كل الناس وبينك بختارك انت يا حبيبي كل مرة` },

  { name: "Card 18", title: "تستاهل اكثر", text: `بتمنى اقدر اعطيك من الفرح قد ما وجودك بيعطيني سعادة يا عمري` },

  { name: "Card 19", title: "قلبي مبسوط", text: `قلبي مبسوط لانك مبسوط يا روحي الله يحفظلك هالضحكة` },

  { name: "Card 20", title: "يا حلو ايامي", text: `انت احلى جزء من يومي واحلى حدا ممكن احكي معه بحبك كثير` },

  { name: "Card 21", title: "امنيتي الك", text: `امنيتي اشوفك دايما ناجح ومبسوط ومرتاح البال وتوصل لكل مكان بتحلم فيه` },

  { name: "Card 22", title: "يا عيوني", text: `يا عيوني انت بتعرف قديش غالي علي وقديش بتمنى اشوفك باحسن حال دايما` },

  { name: "Card 23", title: "احلى انجاز", text: `كل خطوة لقدام بتعملها هي سبب جديد يخليني افتخر فيك اكثر` },

  { name: "Card 24", title: "حبيبي المدلل", text: `يا بيبي انت الك حب ودلع وفرح قد الدنيا كلها` },

  { name: "Card 25", title: "قلبك الحلو", text: `الله يحفظلي قلبك الطيب ويبعد عنك كل شي يزعلك ويقربلك كل شي بفرحك` },

  { name: "Card 26", title: "يا نصيبي الحلو", text: `من كل الاشياء الحلوة اللي صارت معي انت احلاها يا عشقي` },

  { name: "Card 27", title: "رسالة مفاجأة", text: `اذا وصلت لهون وانت مبتسم فاعرف ان في حدا بحبك اكثر مما بتتخيل` },

  { name: "Card 28", title: "ضحكتك عيد", text: `كل مرة بتضحك فيها بحس الدنيا صارت احلى يا حبيب قلبي` },

  { name: "Card 29", title: "الله يديمك", text: `الحمد لله على وجودك بحياتي الله يديم المحبة بينا ويجمعنا دايما على الخير` },

  { name: "Card 30", title: "بحبك وبس", text: `ما عندي كلام كثير بس عندي قلب بحبك كثير وبتمنى يضل سبب من اسباب فرحتك` }
]
    },
    miss: {
        title: "When you miss me...",
        cards: [
  { name: "Card 1", title: "اشتقتلي؟", text: `يا بيبي اذا فتحت هالكرت يعني يمكن مشتاقلي وانا بدي احكيلك انك ببالي حتى لو مش جنبك` },

  { name: "Card 2", title: "تعال بقلبي", text: `يا روحي لو المسافة بتبعدنا فقلبي دايما قريب منك وبحبك بكل لحظة` },

  { name: "Card 3", title: "حضن من بعيد", text: `تخيل اني عم بحضنك هلا وبحكيلك قديش بحبك وقديش نفسي تكون جنبي` },

  { name: "Card 4", title: "سفسوفي", text: `يا سفسوفي اشتقتلك؟ طيب انا كمان مشتاقتلك اكثر مما بتتخيل يا حلو قلبي` },

  { name: "Card 5", title: "انا هون", text: `حتى لو مش حدك هلا انا معك بقلبي ودعواتي وتفكيري وما بنساك` },

  { name: "Card 6", title: "مسافة صغيرة", text: `المسافة بينا ما بتغير شي من حبي الك انت ساكن بقلبي وين ما كنت` },

  { name: "Card 7", title: "يا حبيب الروح", text: `اشتقت لصوتك وضحكتك وحكيك وحتى لتفاصيلك الصغيرة اللي ما حدا غيري بينتبهلها` },

  { name: "Card 8", title: "غمض عيونك", text: `غمض عيونك وتخيلني جنبك بحكيلك بحبك وبطمنك انك اغلى انسان عندي` },

  { name: "Card 9", title: "رسالة شوق", text: `لو تعرف قديش بتيجي على بالي خلال اليوم كان عرفت انك ما بتغيب عن قلبي ابدا` },

  { name: "Card 10", title: "يا عمري", text: `يا عمري نفسي اكون جنبك هلا واحكيلك كل الكلام الحلو اللي بخبيه الك` },

  { name: "Card 11", title: "وحشتني", text: `وحشتني يا حبيبي بكل تفاصيلك وبكل لحظة حلوة عشناها سوا` },

  { name: "Card 12", title: "قربك حلو", text: `ما في مكان بحبه اكثر من المكان اللي بتكون فيه انت جنبي` },

  { name: "Card 13", title: "دلع مشتاق", text: `يا بيبي يا مدللي تعال خد كل الحب اللي مخبيته الك` },

  { name: "Card 14", title: "قلبي عندك", text: `يمكن انا بعيدة عن عيونك بس قلبي عندك وما بده يرجع` },

  { name: "Card 15", title: "صوتك", text: `اشتقت لصوتك اللي بيخليني اهدى حتى لو كان يومي كله تعب` },

  { name: "Card 16", title: "لو كنت جنبي", text: `لو كنت جنبي هلا كان اول شي عملته اني احكيلك قديش انت غالي علي` },

  { name: "Card 17", title: "كل تفاصيلي", text: `في اشياء كثيرة بتذكرني فيك وكل ما اتذكرك ببتسم لحالي` },

  { name: "Card 18", title: "يا سعادتي", text: `انت مش بس شخص مشتاقتله انت الشخص اللي وجوده بيخلي كل شي احلى` },

  { name: "Card 19", title: "رسالة قبل النوم", text: `اذا اشتقتلي قبل ما تنام تذكر ان في قلب بدعيلك وبتمنى يصحى على خبر حلو منك` },

  { name: "Card 20", title: "بدي اياك تعرف", text: `بدي تعرف ان اشتياقي الك مش بس لما تغيب انت حتى وانت معي بحب قربك` },

  { name: "Card 21", title: "يا قلبي", text: `يا قلبي انت لو تعرف قديش وجودك بيفرق معي كان ما خليتني اشتاقلك كل هالقد` },

  { name: "Card 22", title: "رسالة صغيرة", text: `هاي بوسة على جبينك من بعيد وحضن كبير لحد ما نشوف بعض` },

  { name: "Card 23", title: "انت مكاني", text: `مش مهم وين نكون المهم انك انت الشخص اللي قلبي اختاره من بين الكل` },

  { name: "Card 24", title: "يا حلو", text: `اشتقت لدلعك وحكيك واهتمامك واشتقت اكون سبب ابتسامتك` },

  { name: "Card 25", title: "قرب موعدنا", text: `خلي ببالك ان كل لحظة شوق بتقربنا من لحظة حلوة نكون فيها مع بعض` },

  { name: "Card 26", title: "دعوة الك", text: `الله يحفظك وين ما كنت ويطمن قلبي عليك ويجمعني فيك على خير يا حبيبي` },

  { name: "Card 27", title: "يا اغلى الناس", text: `ما بدي من الدنيا كثير بس بدي اشوفك بخير واسمع صوتك واعرف انك مبسوط` },

  { name: "Card 28", title: "تخيل معي", text: `تخيلني قاعدة جنبك وعم بحكيلك قصص عشوائية بس عشان اطول وقتي معك` },

  { name: "Card 29", title: "اشتياق ودلع", text: `سفسوفي الحلو انت اشتقتلك واشتقت لكل لحظة بتخليني احس اني اقرب انسانة الك` },

  { name: "Card 30", title: "انت ببالي", text: `حتى لو كنت مشغولة بلاقي حالي بفكر فيك وبسأل حالي شو عم تعمل هلا` },

  { name: "Card 31", title: "يا نصيبي", text: `يا رب ما يطول البعد بينا ويجمعنا دايما على محبة وفرح وراحة بال` },

  { name: "Card 32", title: "كلمة بحبك", text: `لو اقدر ابعتلك كلمة بحبك كل ثانية كان خليت تلفونك كله مني` },

  { name: "Card 33", title: "مكانك بقلبي", text: `ما في مسافة ولا وقت بيغير مكانك بقلبي انت الك مكان ما بياخده حدا` },

  { name: "Card 34", title: "يا عيوني", text: `يا عيوني انت اشتقتلك قد كل الكلام الحلو اللي نفسي احكيلك اياه` },

  { name: "Card 35", title: "لحظة لقاء", text: `مستنية اللحظة اللي اشوفك فيها واحكيلك ان كل هالاشتياق كان الك انت` },

  { name: "Card 36", title: "حبيبي الغالي", text: `اذا حسيت انك لحالك تذكر انك بقلبي وفي حدا بتمنى لك الخير بكل لحظة` },

  { name: "Card 37", title: "يا كل دنيتي", text: `انت من الناس اللي حتى غيابهم بيكون حضورهم بقلبي بكل تفصيلة` },

  { name: "Card 38", title: "حضن مؤجل", text: `مخبية الك حضن كبير وحكي كثير وحب ما بيخلص لليوم اللي نشوف بعض فيه` },

  { name: "Card 39", title: "اشتقتلك كثير", text: `ما بعرف كيف اوصفلك اشتياقي بس بعرف اني بحبك اكثر من كل مرة قلتلك فيها بحبك` },

  { name: "Card 40", title: "من قلبي الك", text: `يا حبيبي وين ما كنت تذكر انك محبوب وغالي وعندك قلب ثاني بالدنيا دايما مشتاقلك` }
]
    },
    motivation: {
        title: "When you need motivation...",
        cards: [
  { name: "Card 1", title: "انت قدها", text: `يا بيبي تذكر دايما انك قد كل شي بتحلم فيه وانا مؤمنة فيك وبقدراتك كثير` },

  { name: "Card 2", title: "لا تستسلم", text: `حبيبي كمل طريقك حتى لو كان صعب كل خطوة بتاخدها بتقربك من حلمك` },

  { name: "Card 3", title: "انا فخورة فيك", text: `سفسوفي انا فخورة فيك مش بس لما تنجح كمان بكل مرة بتحاول فيها وما بتستسلم` },

  { name: "Card 4", title: "ثق بحالك", text: `يا روحي لا تقلل من قدراتك انت عندك قوة وذكاء وقدرة اكبر مما بتتخيل` },

  { name: "Card 5", title: "خطوة خطوة", text: `مش لازم توصل لكل شي بيوم واحد المهم تضل تحاول وتتقدم ولو بخطوة صغيرة` },

  { name: "Card 6", title: "حلمك بستاهل", text: `لا تتخلى عن احلامك يا عمري انت تعبت وحاولت وبتستاهل تشوف تعبك يثمر` },

  { name: "Card 7", title: "انا بآمن فيك", text: `حتى بالايام اللي بتشك فيها بحالك تذكر اني دايما بآمن فيك وبقدرتك` },

  { name: "Card 8", title: "بطل قلبي", text: `يا بطلي انت اقوى من خوفك واكبر من اي تحدي بواجهك` },

  { name: "Card 9", title: "لا تقارن حالك", text: `كل شخص اله طريقه ووقته لا تقارن رحلتك بحدا وخليك مركز على تطورك` },

  { name: "Card 10", title: "بكرة احلى", text: `يمكن اليوم يكون صعب بس بكرة فرصة جديدة وبداية جديدة وربنا كريم` },

  { name: "Card 11", title: "خذ نفس", text: `يا حبيبي خذ نفس واهدأ مش لازم تحمل كل شي مرة وحدة انت بتقدر تاخد وقتك` },

  { name: "Card 12", title: "انت مميز", text: `لا تنسى انك شخص مميز وعندك اشياء حلوة وقدرات بتستاهل تفتخر فيها` },

  { name: "Card 13", title: "كمل يا قلبي", text: `كمل يا سفسوفي انا مستنية اشوفك تحقق الاشياء اللي بتحلم فيها وتفرح من قلبك` },

  { name: "Card 14", title: "كل محاولة مهمة", text: `حتى لو النتيجة ما كانت مثل ما بدك كل محاولة بتعلمك وبتقوي خبرتك` },

  { name: "Card 15", title: "ربنا معك", text: `توكل على الله واعمل اللي عليك وربنا ما بضيع تعب حدا` },

  { name: "Card 16", title: "لا تخاف من البداية", text: `كل نجاح كبير بدأ بخطوة صغيرة فلا تخاف تبدأ حتى لو الطريق مش واضح كله` },

  { name: "Card 17", title: "انا سندك", text: `يا عمري بتمنى اكون دايما مصدر دعم الك وتعرف انك مش لحالك` },

  { name: "Card 18", title: "ارفع راسك", text: `ارفع راسك يا حبيبي انت عم تحاول وعم تتعلم وهاي لحالها اشياء بتفتخر فيها` },

  { name: "Card 19", title: "استراحة مش نهاية", text: `اذا تعبت ارتاح شوي وخد وقتك بس لا تنسى ان احلامك لسا بتستناك` },

  { name: "Card 20", title: "انت بتقدر", text: `بدي اياك تدخل كل تحدي وانت متذكر انك قادر تتعلم وتتحسن وتنجح` },

  { name: "Card 21", title: "دعوة الك", text: `اللهم افتح له ابواب الخير والتوفيق ويسر له كل صعب وحقق له ما يتمنى` },

  { name: "Card 22", title: "لا تسمع للإحباط", text: `خلي تركيزك على هدفك وما تخلي كلمة سلبية تنسيك قديش انت قادر` },

  { name: "Card 23", title: "انا مصدقتك", text: `يا بيبي انا مصدقة فيك وبحلمك وبعرف انك رح تعمل اشياء حلوة بطريقتك` },

  { name: "Card 24", title: "كل شي بوقته", text: `لا تستعجل النتائج يا روحي كل شي اله وقته وخليك صبور مع نفسك` },

  { name: "Card 25", title: "فكر باللي وصلتله", text: `تطلع وراك وشوف قديش تعلمت وتغيرت وتقدمت لا تنسى انك قطعت شوط كبير` },

  { name: "Card 26", title: "انت قد المسؤولية", text: `بعرف انك بتقدر تتحمل المسؤولية وتاخد قرارات حلوة وتوصل للي بدك اياه` },

  { name: "Card 27", title: "لا توقف", text: `يمكن الطريق طويل بس كل يوم بتعمل فيه شي بسيط هو تقدم جديد` },

  { name: "Card 28", title: "يا فخر قلبي", text: `يا سفسوفي انت فخر قلبي وانا بحب اشوفك تسعى وتكبر وتحقق طموحاتك` },

  { name: "Card 29", title: "ابدأ من جديد", text: `اذا ما زبطت معك من اول مرة عادي جرب بطريقة ثانية وتذكر ان الغلط جزء من التعلم` },

  { name: "Card 30", title: "ربنا بيسرها", text: `استودع تعبك واحلامك عند ربنا وادعيه يكتبلك الخير وين ما كان` },

  { name: "Card 31", title: "لا تقلل من نفسك", text: `انت عندك قيمة كبيرة حتى قبل اي انجاز فلا تربط قيمتك بالنتائج` },

  { name: "Card 32", title: "يوم جديد", text: `كل صباح فرصة جديدة تتعلم فيها وتنجز شي يقربك من الحياة اللي بتتمناها` },

  { name: "Card 33", title: "انا معك", text: `وقت النجاح رح افرحلك ووقت التعب رح اسمعلك ودايما رح اتمنى اشوفك بخير` },

  { name: "Card 34", title: "ثق برحلتك", text: `مش لازم تكون عارف كل الاجابات هلا المهم تكون مستعد تتعلم وتكمل` },

  { name: "Card 35", title: "يا شاطر", text: `يا شاطر قلبي شد حيلك واعمل اللي بتقدر عليه والباقي على رب العالمين` },

  { name: "Card 36", title: "كل تعب اله معنى", text: `كل تجربة بتعيشها بتعلمك اشي جديد وبتساعدك تصير اقرب للشخص اللي بدك تكونه` },

  { name: "Card 37", title: "انا فخورة بمحاولتك", text: `حتى لو ما حدا لاحظ تعبك انا بدي اذكرك ان محاولاتك مهمة وانا فخورة فيك` },

  { name: "Card 38", title: "ما في شي مستحيل", text: `خلي عندك امل واشتغل على حلمك واستعين بالله وخلي قلبك مطمن` },

  { name: "Card 39", title: "مستقبلك حلو", text: `بتمنى تشوف حالك بالمكان اللي بتحلم فيه وتكون راضي عن كل خطوة مشيتها` },

  { name: "Card 40", title: "رسالة من حبيبتك", text: `يا حبيبي مهما صار لا تنسى اني بحبك وبفتخر فيك وبشجعك من كل قلبي وبتمنى الك كل النجاح` }
]
    }
};

let currentMood = null;
let bag = [];

function openMood(key) {
    currentMood = key;
    bag = [];
    go("letterscreen");
    showNextCard();
}

function showNextCard() {
    const cards = LETTERS[currentMood].cards;

    // when all cards were shown, shuffle them again
    if (bag.length === 0) {
        bag = cards.slice().sort(function () { return Math.random() - 0.5; });
    }
    const card = bag.pop();

    const letter = document.getElementById("letter");
    letter.innerHTML = "";

    const heading = document.createElement("h3");
    heading.className = "script";
    heading.textContent = card.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = card.text;

    letter.appendChild(heading);
    letter.appendChild(paragraph);
    letter.scrollTop = 0;

    const seen = cards.length - bag.length;
    document.getElementById("cardhint").textContent =
        "Tap the card for another message 💌 (" + seen + " / " + cards.length + ")";
}

document.getElementById("letter").onclick = showNextCard;

document.addEventListener("click", function (event) {
    const target = event.target.closest("[data-mood]");
    if (target) openMood(target.dataset.mood);
});

function makeDeck(deckId, items, prompt) {
    const deck = document.getElementById(deckId);
    let bag = [];

    deck.innerHTML =
        '<div class="dcard"><div class="dprompt">' + prompt + '</div></div>' +
        '<p class="hint dcount"></p>';

    const card = deck.querySelector(".dcard");
    const count = deck.querySelector(".dcount");

    card.onclick = function () {
        // when all cards were shown, shuffle them again
        if (bag.length === 0) {
            bag = items.slice().sort(function () { return Math.random() - 0.5; });
        }
        const item = bag.pop();

        card.innerHTML = "";

        if (item.title) {
            const h = document.createElement("h3");
            h.className = "script";
            h.dir = "auto";
            h.textContent = item.title;
            card.appendChild(h);
        }
        if (item.image) {
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = "";
            img.onerror = function () { img.remove(); };
            card.appendChild(img);
        }
        if (item.text) {
            const p = document.createElement("p");
            p.className = "dtext";
            p.dir = "auto";
            p.textContent = item.text;
            card.appendChild(p);
        }

        card.classList.remove("pop");
        void card.offsetWidth;
        card.classList.add("pop");

        const seen = items.length - bag.length;
        count.textContent = "Tap the card for another one (" + seen + " / " + items.length + ")";
    };
}


/*---
---write smth below---
---*/
const SCENES = [
    { title: "بس ترجع من الشغل", image: "images/scene5.jpg", text: `«بيبييي بس ترجع من الشغل بدي اكون ناطرتك، واول ما تفوت لعندي بجي بركض لعندك وبحضنك حضن طوييييل، وببوسك وبقلك يا عيون قلبي نورت البيت، تعا لعندي يا سفسوفتي، كيف كان يومك؟ تعبت حبيبي؟ وباخد منك اغراضك و اشلحك وبقلك يلا روح غير وارتاح وانا بجهزلك شي تاكله. وبعدين بدي أخدك وتقعد جنبي وأضل أبوس خدودك وأمرر إيدي بشعرك وأدلّعك احلى دلع يا بيبي، وإذا شفتك نعسان بقلك تعا حط راسك بحضني يا كتكوتي، وبصير اسرج شعرك بإيدي واحكيلك شقد بحبك و فخورة فيك لحتى تنام. وبضل اتطلع عليك واقلك يا الله شو بحب هالزلمة أنااا».` },

    { title: "لما تكون نعسان", image: "images/scene2.jpg", text: `«إذا شفتك عم تتثاوب وعيونك عم تسكر رح اقلك ولك سفسوفتي نعست؟ تعا يا بيبي، يلا بدي نومك. رح أخليك ترتاح وتحط راسك بحضني، وبصير أمسحلك على شعرك وأبوس جبينك، وكل شوي أقلك نام يا روحي، أنا هون. وإذا فتحت عيونك بقلك شووو؟ لسا صاحي هالكتكوت؟ و بس تنام هيك باخد صوره لجمالك هاد واضي الصبح كلو اشغلك فيها».` },

    { title: "لما تكون مشتاقلي", image: "images/scene3.jpg", text: `لما نتلاقى بعد فترة ما شفنا بعض، بدي أول ما أشوفك أجي أحضنك وأضل شوي بحضنك، وبقلك اشتقتلك، شو طولت عليي هالمرة. وبعدين نمشي سوا ونحكي عن كل شي صار معنا بالفترة اللي ما شفنا بعض فيها، وبدي اضل ماسكة إيدك وأقرب منك، واستغل كل لحظة نكون فيها سوا بدل ما يخلص الوقت بسرعة` },

    { title: "لما تكون تعبان وبدك تدليل", image: "images/scene4.jpg", text: `«بدي أعملك مساج خفيف لكتافك وأقلك ريّح حالك يا بيبي (عشان حتعملي بعدها طبعا ) ، اليوم ما عليك أي مسؤولية، وبجيبلك أكلك وبحطلك مي جنبك، وبصير أسألك بدك شي يا عيوني؟ متأكد ما ناقصك شي؟ وبعدين بقعد جنبك وبحط راسك بحضني وبضل أحكيلك قديش إنت حبيبي المدلل، وبدي إياك تتعود إنك لما تكون تعبان تلاقي عندي راحة وحنان. اول ما تمرض بكون فوق راسك حتى تفيق مرتاح و اوي` },

    { title: "بيوم العطلة", image: "images/scene5.jpg", text: `بدي أصحى قبلك شوي وأتركك نايم، ولما تصحى أجي لعندك وأقلك صباح الخير يا أحلى دبدوب بالدنيا ، وابوسك واقلك يلا يا بيبي قوم عملتلك فطور. وبعدين نقعد ناكل سوا واضل اسرق من صحنك وبدي نقضي اليوم كله سوا نطبخ ونحضر شي ونضحك وننام  وما يكون عنا أي برنامج غير إننا ننبسط مع بعض .` },

    { title: "لما تكون بدك تنام بحضني", image: "images/scene6.jpg", text: `يا بيبي نفسي تكون ليلة من اللي تكون فيها تعبان وبدك تنام، وتجي تتمدد جنبي وتحط راسك بحضني، وأنا أضمك وأغطيك منيح وأضل أبوس جبينك وخدك، وأمرر إيدي بشعرك شوي شوي. وإذا سألتني شو عم تعملي بقلك عم دلّع حبيبي، اسكت إنت ونام . وبضل أهمسلك قديش بحبك وقديش بحب وجودك جنبي، لحتى تغفى يا سكري.` }
];

makeDeck("deckScenes", SCENES, "Tap the card 💫");


/* Our galaxy*/
const THINGS_TEXT = [
    "I love your smile",
    "You're cute",
    "Your style",
    "The way you talk",
    "Your laugh",
    "Your eyes",
    "Your voice",
    "Your personality",
    "Your masculinity",
    "The way u make me feel like a princess",
    "How caring you are",
    "Your kidness",
    "Your honesty",
    "The way you lyssen to me",
    "How you make me happy",
    "Your sense of humor",
    "Your energy",
    "Your loyalty",
    "The way you look at me",
    "Your confidence",
    "The way you always cheer me up",
    "Your little jokes",
    "Your intelligence",
    "The way you text me",
    "Your good morning messages",
    "Your good night messages",
    "How you remember the little things about me",
    "Your patience with me",
    "The way you love me",
    "The way you say my name",
    "Your taste in music",
    "How comfortable I feel around you",
    "Your warmth",
    "Your cute reactions",
    "Your excitement",
    "The way you trust me",
    "Your compliments",
    "The way you laugh at my jokes",
    "Your positive energy",
    "The way you motivate me",
    "Your creativity",
    "Your beautiful hair",
    "Your gentleness",
    "The way you care about others",
    "Your random messages",
    "Your attention to detail",
    "The way you get excited over little things",
    "Your cute little habits",
    "How safe you make me feel",
    "Your adorable face",
    "Your comforting words",
    "The way you flirt with me",
    "Your random thoughts",
    "Your heart",
    "The way you make ordinary days feel special",
    "The way your personality balances mine",
    "Your emotional side",
    "The way you smile at your phone",
    "How you understand my feelings",
    "The respect you have for me",
    "The way you say I love you",
    "Your little gifts",
    "Your reactions when you're happy",
    "The way you get shy",
    "The effort you put into our relationship",
    "The way you believe in me",
    "Your laugh when you just can't stop laughing",
    "How cute you are without even trying",
    "The way you make me feel important",
    "Our deep conversations",
    "Your playful side",
    "Your affection",
    "Your curiosity",
    "The way you check up on me and make sure I'm okay",
    "Your smile in pictures",
    "The way you act when you're around me",
    "The way you make me feel loved",
    "Your unique personality",
    "The way you comfort me",
    "How you respect my feelings",
    "The way you hold my hand",
    "Your spontaneous compliments",
    "The way you make me laugh",
    "Your beautiful mind",
    "The way you accept me for who I am",
    "Your happiness over the little things",
    "The way you take an interest in my day",
    "Your emotional intelligence",
    "The way you calm me down",
    "Your cute selfies",
    "The way you get excited about things",
    "How you notice when I'm sad",
    "The way you show me love",
    "Your beautiful soul",
    "The way you kiss me",
    "The effort you make to understand me",
    "The way you are sometimes hard on yourself",
    "The way you don't see how handsome you are",
    "The way I wish you could see yourself through my eyes you are the most handsome boy in the world to me and nothing could ever change the way I see you"

];

// turns the list above into cards: "Thing #1", "Thing #2", ...
const THINGS = THINGS_TEXT.map(function (text, i) {
    return { title: "Thing #" + (i + 1), text: text };
});

makeDeck("deckGalaxy", THINGS, "Tap the card ✨");

/*arabic letter*/
const MESSAGES = [
    { text: `انت انسان رائع و خرافي و اي حد بشاركك بحياتك فهو محظوظ و ياريت يعرفوا هل النعمه. ابستامتك بتجنن اوي و بدي على طول اشوفها و استخدمها اكتر` },
    { title: "إلى سيد الرجال", text: ` انا هنا دائما اراقب فخر خطواتك واؤمن بك وبأحلامك اكتر من اي شي اخر، ثق ان ما زرعه الله في قلبك من طموح وامل لن يضيع هباء و ستصل حقا الى القمه التي تتمناها.
ازا مالت فيك الايام و ظهرك الي بتستند عليه تذكر دائما يا يوسف اني جنبك و بحميك بدعائي بكل وقت و استودعك الله في كل لحظه واسأله ان يحفظك لي ويبعد عنك كل سوؤ و يكتب لك كل خير.
بحبك بحضورك و بغيابك، في قربك و بعدك. رح اضل على طول احبك دام قلبي بينبض و لو شو ما صار عيد ميلاد سعيد يا روح ساكنه روحي` },
    { text: `رزقني الله فيك وايقنت انك اجمل واعظم اختيار للابد.
انت كل نعمتي و روحي و كفايتي الي بعدها ما احتاج اي شي انت الروح الي عشقتها و ما اقدر اعيش من غيرها دمت لي عمر و حياه طويله ` },
    { title: "إلى وجهتي الامنه", text: `اتمنى لك في هذا العاموفي كل عام سعاده ما إلها نهاية، وصحه و عاليه، ونجاح بيلبق بكل احلامك
بتمنى تبقى ابتسامتك الحلوة ما تفارق وجهك ابدا. خليك دوم متذكر انه مهما تغيرت الحياة والايام و مهما اخشتنا الطرق راح ابقى ممتنه لكل لحظه حلوه عشانها معك و جمعتني فيك لا مكانك بقلبي بيكبر يوم بعد بوم وبصير اغلى يوم عن يوم.
شكرا ان وجودك بحياتي راحه. ولأن الامام الي بتحسسني فيه ما بيشبه اي شعور تاني. انت فرحة عمري اللي بتمناها تضل ف كل ايامي. كل عام والدنيا ما تحلى الا بوجودك وكل عام وانت كل الخير. بحب كل شي بينا و بحبك اكتر من ما الكلمات بتقول حبيبي
رزقني الله فيك وايقنت انك اجمل واعظم اختيار للابد.
انت كل نعمتي و روحي و كفايتي الي بعدها ما احتاج اي شي انت الروح الي عشقتها و ما اقدر اعيش من غيرها دمت لي عمر و حياه طويله` },
    { text: `لو تعرف شو بصير بقلبي كل ما اجيت على بالي ممكن تستغرب من كيمة الحب الي بحمله لك بشتاق لك حتى لو معك و بفرح بابسط كلمه منك. بحب تفاصيلك الي يمكن ما حد شايفها ولا حتى انت بس انا بتعنيلي كتير بحب وجودك و وبحب شعوري وانا معك وبحب ان قلبي اختارك من بين كل الناس ولو سألتني امنيتي بقول اتمنى ان هالكب يضل بيننا ولا يصير مجرد ذكره` },
    { text: `اكتفيت فيك بحب لك و بحبك لي و اكتفيت بشوفتك و بكلامك و بسمع صوتك اكتفيت بكل شي فيك ان كان من جمال او عيوب ولا والله لو فيك عيوب الدنيا كلها لحبيتك مليون مره حبيتك لحالك و عشقتك لحالك و مت و هويتك لوحدك تملكتني و عشقتك بكل ما فيك جمال وجهك و كلامك و صوتك يا ماخد بالي و عقلي و نفسي 
انت حبيبي و روحي و عمري و سندي و عالمي و قللي و عاليتي و اميري و ملاذي و وتيني وامي وابي و ضحكتي و بسمتي و كوني وارضي وسمائي و حبيب روحي و نعمتي و عوضي و رزقي فريبي و امنيتي وامانيي كلها ملجئي و فرحتي و ملكي انت كلللل شي بالنسبه الي انت الي ماخذنيم ن الدنيا كلها عسى ما انحرم منك ولا من عيونك بموت فيك` },
    { text: `بعرف انو ما تقبالنا لسا بعرف انو ما سرحت شعرك إلى بخيالي 
وبعرف منيح انني ما بعرف كيف بتشرب قهوتك وكيف بترتب مواعيدك ولا بعرف ازا بتحب تنام ع بطنك و لا ظهرك ولا ازا نوباتك زعلك بتجي صاخبه.
ما بعرف شو الاغنيه الي بتلم شتاتك لما بتزعا ولا شكل ظعائك لما بتتمنى ولا رجفه ايديك لما تكتب شي بيشبهك. ولا كم مره حكيت انك بخيرىما كنت باشد همومك ما بعرف عدد لعيون الي لمحت خطوط ابتسامتك بس بعرف شقد كنت بتمنى كون معك بكل لحظه صارت و حتصير` },
    { text: `كل شي فيك بدازي شي جوايه. كلماتك مو بس حروف كلماتك وطني و حضن برتمي فيه كل ما ثقلت علي الايام . ضحكتك و صوتك بترجع نبضي و بيطفوا ضجيج افكاري. نظرتك الي بتمنى اشوفها لامحتني لشوف فيهم طريق سالم ما فيه الا نحنا. من يوم عرفتك يا يوسف عرفت انو في اشخاص ما بيدخلوا حياتنا صدفه بس بيجو ليرموا كل شي كسرتوا الايام و بيزرعوا بالقلب طمئنانين ما بتنشرى ولا توصف ` },
       { text: `في خيالي بنيت لنا منزل دافئ بنتبادل فيه حبنا مع اولادنا، وانت بتحسس على شعري حتى انان
واني بخاف افيق يوم و اشوف حلمي مهدوم قدامي واضل عمري كلو ابكي ع لى ما ضل من ذكراك من بعد رحيلك ما عاذ الله 
اشوفك جنبي بالحلال
اسويلك طبخ تحبه
اسوياك تورته عيد ميلادك .
اكون عند راسك بس تمرض
انا بحبك اوي اوي اوي يا يوسف ولا ححب من بعدك تاني` }
];

makeDeck("deckNotes", MESSAGES, "Tap the card 💝");

/* ---- Music (several songs, random order) ---- */
const SONGS = [
    { file: "song1.mp3", name: "حبك رزق" },
    { file: "song2.mp3", name: "Matkhafsh Men Bokra" }
];

const audio = document.getElementById("audio");
const pp = document.getElementById("pp");
const next = document.getElementById("next");
const vol = document.getElementById("vol");
const songname = document.getElementById("songname");
audio.volume = 0.5;

let queue = [];
let current = null;

function pickSong() {
    if (queue.length === 0) {
        queue = SONGS.slice().sort(function () { return Math.random() - 0.5; });
        // don't start the new round with the song that just played
        if (SONGS.length > 1 && queue[queue.length - 1] === current) {
            queue.reverse();
        }
    }
    return queue.pop();
}

function loadSong() {
    current = pickSong();
    audio.src = current.file;
    songname.textContent = current.name;
}

function playMusic() {
    if (!current) loadSong();
    audio.play().then(function () {
        pp.textContent = "⏸";
    }).catch(function () {});
}

pp.onclick = function () {
    if (audio.paused) {
        playMusic();
    } else {
        audio.pause();
        pp.textContent = "▶";
    }
};

next.onclick = function () {
    loadSong();
    playMusic();
};

audio.onended = function () {
    loadSong();
    playMusic();
};

vol.oninput = function () {
    audio.volume = vol.value;
};


setInterval(function () {
    const heart = document.createElement("span");
    heart.className = "fheart";
    heart.textContent = "♥";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (12 + Math.random() * 16) + "px";
    heart.style.animationDuration = (8 + Math.random() * 6) + "s";
    document.body.appendChild(heart);
    setTimeout(function () { heart.remove(); }, 15000);
}, 3500);
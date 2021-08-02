const keyOutLayer = document.querySelector('.keyOutLayer');
const input = document.getElementById('inputBox');
const btn = document.getElementsByClassName('btn');

// all keys and their textvalue
const keys = [{
        val: "1",
        smallVal: ".,!"
    },
    {
        val: "2",
        smallVal: "abc"
    },
    {
        val: "3",
        smallVal: "def"
    },
    {
        val: "4",
        smallVal: "ghi"
    },
    {
        val: "5",
        smallVal: "jkl"
    },
    {
        val: "6",
        smallVal: "mno"
    },
    {
        val: "7",
        smallVal: "pqrs"
    },
    {
        val: "8",
        smallVal: "tuv"
    },
    {
        val: "9",
        smallVal: "wxyz"
    },
    {
        val: "*",
        smallVal: ""
    },
    {
        val: 0,
        smallVal: "   "
    },
    {
        val: "#",
        smallVal: ""
    },
]

// set the button in in frontend
keys.forEach((value, i) => {
    keyOutLayer.innerHTML += `<button data-text="${value.smallVal}" class="btn" id="btn${i}" data-number="${value.val}"> ${value.val} <small>${value.smallVal}</small></button>`
})

// logic of buttons
var busy = true,
    hold,
    is_busy,
    delay = 1000,
    change = -1,
    click = null;

for (var i = 0; i < keys.length; ++i) {
    // on mouse down
    btn[i].onmousedown = function (e) {
        var text = this.getAttribute('data-text').split(""),
            number = this.getAttribute('data-number');
        busy = true;
        clearTimeout(is_busy);
        if (click !== e.target) {
            busy = false;
        }
        if (change >= text.length - 1 || click !== e.target) {
            change = 0;
            click = e.target;
        } else {
            change = change + 1;
        }
        if (text[0] === '#') {
            input.value = input.value.slice(0, -1);
            hold = setTimeout(function () {
                input.value = "";
            }, delay);
            return;
        }
        hold = setTimeout(function () {
            input.value = input.value.slice(0, -1) + number;
        }, delay);
        input.value = busy ? input.value.slice(0, -1) + text[change] : input.value + text[change];
    };

    // onmouseUp
    if('ontouchstart' in document.body){
        btn[i].ontouchstart = function (e) {
            clearTimeout(hold);
            busy = true;
            is_busy = setTimeout(function () {
                change = -1;
                busy = false;
                e.target = null;
            }, delay);
            // put caret at the end of text input
            input.focus();
            input.selectionStart = input.selectionEnd = input.value.length;
        };
    }
    btn[i].onmouseup = function (e) {
        clearTimeout(hold);
        busy = true;
        is_busy = setTimeout(function () {
            change = -1;
            busy = false;
            e.target = null;
        }, delay);
        // put caret at the end of text input
        input.focus();
        input.selectionStart = input.selectionEnd = input.value.length;
    };
}
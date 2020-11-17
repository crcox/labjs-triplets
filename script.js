// Define study
function load_json(fname) {
  const response = await fetch(this.files['demo.json']);
  return await response.json();
}
function load_csv(fname) {
  const url = this.options.files[fname]
  const csv2json = await new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        resolve(result.data);
      }
    })
  })
  console.log(csv2json)
  return csv2json
};
function seq_along(x) {
  const ind = Array(x.length);
  for (let i = 0; i < x.length; i++) {
    ind[i] = i;
  }
  return ind
}
function seq(start, stop) {
  if (start < stop) {
    x = Array(stop - start)
    for (let i = 0; i < x.length; i++)
      x[i] = i + start;
  } else {
    x = Array(start - stop)
    for (let i = 0; i < x.length; i++)
      x[i] = stop - i;
  }
  return x
}
function choose(n, k) {
// source: https://stackoverflow.com/a/36345790/1277193
	var nCk = 1;
  for (let i = 0; i < k; i++) {
    nCk = nCk * (n - i);
    nCk = Math.floor(nCk / (i + 1));
  }
  return nCk
}
function index2combination(index, n, k) {
// Yields the items of the single combination that would be at the provided
// (0-based) index in a lexicographically sorted list of combinations of choices
// of k items from n items [0,n), given the combinations were sorted in 
// descending order. Yields in descending order.
// source: https://stackoverflow.com/a/36345790/1277193
  const out = Array(k);
  var curIndex = choose(n, k);
  var nCk = curIndex;
  for (let i = k; i > 0; i--) {
    nCk = nCk * i;
    nCk = Math.floor(nCk / n);
    while ((curIndex - nCk) > index) {
      curIndex = curIndex - nCk;
      nCk = nCk * (n - i);
      nCk = nCk - (nCk % i);
      n = n - 1;
      nCk = Math.floor(nCk / n);
    }
    n = n - 1;
    out[k - i] = n
  }
  return out
}
function combination2index(combination) {
// Returns the (0-based) index the given combination would have if it were in
// a reverse-lexicographically sorted list of combinations of choices of
// len(combination) items from any possible number of items (given the
// combination's length and maximum value)
// - combination must already be in descending order,
//   and it's items drawn from the set [0,n).
    let result = 0;
    for (let i = 0; i < combination.length; i++) {
        let a = combination[i]:
        result += choose(a, i + 1)
    return result
}
function n_triplets(n) {
  return n * choose(n - 1, 2);
}
function index2triplet(index, n) {
  const out = Array(3);
  N = choose(n - 1, 2);
  out[0] = Math.floor(index / N);
  tmp = index % N;
  opts = index2combination(tmp, n, 2);
  out[1] = opts[0] < out[0] ? opts[0] : opts[0] + 1;
  out[2] = opts[1] < out[0] ? opts[1] : opts[1] + 1;
  return out;
}
function getRandomSubarray(arr, size) {
// This implements a partial sort because number of triplets >> sample size.
// source: https://stackoverflow.com/a/11935263/1277193 
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
function sample_triplets(x, n) {
  const N = n_triplets(n)
  var y = this.random.sample(wordindex, 3);
  for (let i = 0; i < y.length; i++) {
  }
}
// Preallocate for the tripletIdList, which is used to enforce
// uniqueness over the number of triplets.
const tripletIdList = Array(wordlist.length * 2);
// Construct triplets by sampling
for (let i = 0; i < nTriplets; i++) {
  let tripletIdA = this.random.sample(wordindex, 3);;
  let tripletIdB = [];
  let isDuplicated = true; // set as true to begin while loop
  while (isDuplicated === true) {
    tripletIdA = this.random.sample(wordindex, 3);
    tripletIdB = [tripletIdA[0], tripletIdA[2], tripletIdA[1]];
    for (let j = 0; j < i; j++) {
      isDuplicated = tripletIdA.every(function(value, index) {
        return value === tripletIdList[j][index]
      });
      if (isDuplicated === true) {
        break;
      }
      isDuplicated = tripletIdB.every(function(value, index) {
        return value === tripletIdList[j][index]
      });
      if (isDuplicated === true) {
        break;
      }
    } // end inner for loop
  } // end while loop
  // Record the current tripletId array in the tripletIdList
  tripletIdList[i] = tripletIdA;
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.PostMessage",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "Emotion Words Study",
    "description": "Measure similarity among emotion concepts in a 2AFC task.",
    "repository": "",
    "contributors": "Christopher R. Cox \u003Cchriscox@lsu.edu\u003E"
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Sequence",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Introduction",
      "content": [
        {
          "type": "lab.html.Form",
          "content": "\u003Cform\u003E\n\u003Cheader class=\"content-horizontal-center\"\u003E\n  \u003Cdiv class=\"w-l\"\u003E\n  \u003Ch1\u003EInstructions\u003C\u002Fh1\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center\" style=\"text-align: justify\"\u003E\n\u003Cdiv class=\"w-l\"\u003E\n\u003Cp\u003EIn this study, you will be asked to group words based on the similarity and relatedness of the concepts they refer to. On each trial, you will be presented with three words arranged in a triangle on the screen. The word at the top of the triangle is the \u003Cb\u003Ereference word\u003C\u002Fb\u003E. The task is to pick the word that goes best with the reference word based on the meaning behind the words, feelings they evoke, or concepts they are associated with.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-horizontal-right content-vertical-center\"\u003E\n  \u003Cbutton type=\"submit\"\u003E\n    Continue →\n  \u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E\n\u003C\u002Fform\u003E\n",
          "scrollTop": true,
          "files": {},
          "responses": {},
          "parameters": {},
          "messageHandlers": {},
          "title": "Instruction"
        },
        {
          "type": "lab.html.Form",
          "content": "\u003Cform\u003E\n\u003Cheader class=\"content-horizontal-center\"\u003E\n  \u003Cdiv class=\"w-l\"\u003E\n  \u003Ch1\u003EAdvice\u003C\u002Fh1\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center\" style=\"text-align: justify\"\u003E\n\u003Cdiv class=\"w-l\"\u003E\n\u003Cp\u003ESome trials will involve words where the choice feels obvious. On others, the choice may be unclear or feel strange. When in doubt, respond with your first impression. There are no right or wrong answers. If at any point you feel stuck, simply make a choice and move on.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-horizontal-right content-vertical-center\"\u003E\n  \u003Cbutton type=\"submit\"\u003E\n    Continue →\n  \u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E\n\u003C\u002Fform\u003E",
          "scrollTop": true,
          "files": {},
          "responses": {},
          "parameters": {},
          "messageHandlers": {},
          "title": "Form"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "keypress(j)": "opt1",
            "keypress(k)": "opt2"
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Example 1",
          "content": "\u003Cheader class=\"content-horizontal-center\"\u003E\r\n  \u003Cdiv class=\"w-l\"\u003E\r\n    \u003Ch1\u003EExample\u003C\u002Fh1\u003E\r\n  \u003C\u002Fdiv\u003E\r\n\u003C\u002Fheader\u003E\r\n\u003Cmain class=\"content-horizontal-center\"\u003E\r\n  \u003Cdiv class=\"w-l\"\u003E\r\n    \u003Cp\u003EThis example trial illustrates that there are different ways for things to be similar to each other. Popcorn and salad are both foods while popcorn and tickets are both present in movie theaters. Whichever aspect of similarity comes to you first or seems most important should dictate your decision.\r\n    \u003C\u002Fp\u003E\r\n    \u003Cp\u003ERespond using \u003Ckbd\u003Ej\u003C\u002Fkbd\u003E to select the left option or \u003Ckbd\u003Ek\u003C\u002Fkbd\u003E to select the right option to proceed.\u003C\u002Fp\u003E\r\n\r\n    \u003Ctable class=\"table-plain\" style=\"font-size: x-large\"\u003E\r\n      \u003Ctr\u003E\r\n        \u003Ctd id=\"cue\" colspan=\"2\"\u003EPOPCORN\u003C\u002Ftd\u003E\r\n      \u003C\u002Ftr\u003E\r\n      \u003Ctr\u003E\r\n        \u003Ctd id=\"opt1\"\u003ESALAD\u003C\u002Ftd\u003E\r\n        \u003Ctd id=\"opt2\"\u003ETICKETS\u003C\u002Ftd\u003E\r\n      \u003C\u002Ftr\u003E\r\n    \u003C\u002Ftable\u003E\r\n  \u003C\u002Fdiv\u003E\r\n\u003C\u002Fmain\u003E"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "keypress(k)": "opt2"
          },
          "parameters": {},
          "messageHandlers": {
            "run": function anonymous(
) {
document.addEventListener("keydown", function (event) {

  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  console.log(event.key);
  switch (event.key) {
    case "j":
        let x = document.getElementById("wrong-answer");
        if (x.style.display === "none") {
          x.style.display = "block";
        }
      break;
    default:
      console.log(event.key);
      return; // Quit when this doesn't handle the key event.
  }
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
}
          },
          "title": "Example 2",
          "content": "\u003Cheader class=\"content-horizontal-center\"\u003E\r\n  \u003Cdiv class=\"w-l\"\u003E\r\n    \u003Ch1\u003EExample\u003C\u002Fh1\u003E\r\n  \u003C\u002Fdiv\u003E\r\n\u003C\u002Fheader\u003E\r\n\u003Cmain class=\"content-horizontal-center\"\u003E\r\n  \u003Cdiv class=\"w-l\"\u003E\r\n    \u003Cp\u003EThis example trial illustrates that we do not care about the similarity of the spelling or pronunciation of the words. CAP and CAT share many letters and sounds, but they refer to things that have little to do with one another.\r\n    \u003C\u002Fp\u003E\r\n    \u003Cp\u003ERespond using \u003Ckbd\u003Ej\u003C\u002Fkbd\u003E to select the left option or \u003Ckbd\u003Ek\u003C\u002Fkbd\u003E to select the right option to proceed.\u003C\u002Fp\u003E\r\n\r\n    \u003Ctable class=\"table-plain\" style=\"font-size: x-large\"\u003E\r\n      \u003Ctr\u003E\r\n        \u003Ctd id=\"cue\" colspan=\"2\"\u003ECAT\u003C\u002Ftd\u003E\r\n      \u003C\u002Ftr\u003E\r\n      \u003Ctr\u003E\r\n        \u003Ctd id=\"opt1\"\u003ECAP\u003C\u002Ftd\u003E\r\n        \u003Ctd id=\"opt2\"\u003EDOG\u003C\u002Ftd\u003E\r\n      \u003C\u002Ftr\u003E\r\n    \u003C\u002Ftable\u003E\r\n    \u003Cdiv id=\"wrong-answer\" style=\"display: none;\" class=\"alert alert-danger\"\u003E\r\n      \u003Cp\u003ECareful! Do not respond based on similarity in spelling. Instead, pick the option that goes best with the reference word based on its meaning, feelings evoked, or conceptual associations.\u003C\u002Fp\u003E\r\n    \u003C\u002Fdiv\u003E\r\n  \u003C\u002Fdiv\u003E\r\n\u003C\u002Fmain\u003E",
          "correctResponse": "opt2"
        },
        {
          "type": "lab.html.Form",
          "content": "\u003Cform\u003E\n\u003Cheader class=\"content-horizontal-center\"\u003E\n  \u003Cdiv class=\"w-l\"\u003E\n    \u003Ch1\u003EReady to begin?\u003C\u002Fh1\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cdiv class=\"w-l\"\u003E\n    \u003Cp\u003EWe will now begin the experiment.\u003C\u002Fp\u003E\n    \u003Cp\u003EPress \"continue\" when you are ready to start.\u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E \n\u003Cfooter class=\"content-horizontal-right content-vertical-center\"\u003E\n  \u003Cbutton type=\"submit\"\u003EContinue →\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E\n\u003C\u002Fform\u003E",
          "scrollTop": true,
          "files": {},
          "responses": {},
          "parameters": {},
          "messageHandlers": {},
          "title": "Ready?"
        }
      ]
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "trialId": "1"
        },
        {
          "trialId": "2"
        },
        {
          "trialId": "3"
        },
        {
          "trialId": "4"
        },
        {
          "trialId": "5"
        },
        {
          "trialId": "6"
        },
        {
          "trialId": "7"
        },
        {
          "trialId": "8"
        },
        {
          "trialId": "9"
        },
        {
          "trialId": "10"
        },
        {
          "trialId": "11"
        },
        {
          "trialId": "12"
        },
        {
          "trialId": "13"
        },
        {
          "trialId": "14"
        },
        {
          "trialId": "15"
        },
        {
          "trialId": "16"
        },
        {
          "trialId": "17"
        },
        {
          "trialId": "18"
        },
        {
          "trialId": "19"
        },
        {
          "trialId": "20"
        },
        {
          "trialId": "21"
        },
        {
          "trialId": "22"
        },
        {
          "trialId": "23"
        },
        {
          "trialId": "24"
        },
        {
          "trialId": "25"
        },
        {
          "trialId": "26"
        },
        {
          "trialId": "27"
        },
        {
          "trialId": "28"
        },
        {
          "trialId": "29"
        },
        {
          "trialId": "30"
        },
        {
          "trialId": "31"
        },
        {
          "trialId": "32"
        },
        {
          "trialId": "33"
        },
        {
          "trialId": "34"
        },
        {
          "trialId": "35"
        },
        {
          "trialId": "36"
        },
        {
          "trialId": "37"
        },
        {
          "trialId": "38"
        },
        {
          "trialId": "39"
        },
        {
          "trialId": "40"
        },
        {
          "trialId": "41"
        },
        {
          "trialId": "42"
        },
        {
          "trialId": "43"
        },
        {
          "trialId": "44"
        },
        {
          "trialId": "45"
        },
        {
          "trialId": "46"
        },
        {
          "trialId": "47"
        },
        {
          "trialId": "48"
        },
        {
          "trialId": "49"
        },
        {
          "trialId": "50"
        },
        {
          "trialId": "51"
        },
        {
          "trialId": "52"
        },
        {
          "trialId": "53"
        },
        {
          "trialId": "54"
        },
        {
          "trialId": "55"
        },
        {
          "trialId": "56"
        },
        {
          "trialId": "57"
        },
        {
          "trialId": "58"
        },
        {
          "trialId": "59"
        },
        {
          "trialId": "60"
        },
        {
          "trialId": "61"
        },
        {
          "trialId": "62"
        },
        {
          "trialId": "63"
        },
        {
          "trialId": "64"
        },
        {
          "trialId": "65"
        },
        {
          "trialId": "66"
        },
        {
          "trialId": "67"
        },
        {
          "trialId": "68"
        },
        {
          "trialId": "69"
        },
        {
          "trialId": "70"
        },
        {
          "trialId": "71"
        },
        {
          "trialId": "72"
        },
        {
          "trialId": "73"
        },
        {
          "trialId": "74"
        },
        {
          "trialId": "75"
        },
        {
          "trialId": "76"
        },
        {
          "trialId": "77"
        },
        {
          "trialId": "78"
        },
        {
          "trialId": "79"
        },
        {
          "trialId": "80"
        },
        {
          "trialId": "81"
        },
        {
          "trialId": "82"
        },
        {
          "trialId": "83"
        },
        {
          "trialId": "84"
        },
        {
          "trialId": "85"
        },
        {
          "trialId": "86"
        },
        {
          "trialId": "87"
        },
        {
          "trialId": "88"
        },
        {
          "trialId": "89"
        },
        {
          "trialId": "90"
        },
        {
          "trialId": "91"
        },
        {
          "trialId": "92"
        },
        {
          "trialId": "93"
        },
        {
          "trialId": "94"
        },
        {
          "trialId": "95"
        },
        {
          "trialId": "96"
        },
        {
          "trialId": "97"
        },
        {
          "trialId": "98"
        },
        {
          "trialId": "99"
        },
        {
          "trialId": "100"
        }
      ],
      "sample": {
        "mode": "sequential",
        "n": ""
      },
      "files": {},
      "responses": {
        "keypress(left)": "1",
        "keypress(right)": "2"
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
// Define the list of words and the number of triplets to randomly
// construct from the list for any given subject.
const nTriplets = 100;
const wordlist = [
  "adoration",
  "affection",
  "amazement",
  "astonishment",
  "compassion",
  "contempt",
  "despair",
  "disappointment",
  "disgust",
  "dread",
  "ecstasy",
  "gladness",
  "glee",
  "gloom",
  "grief",
  "hopelessness",
  "jolliness",
  "misery",
  "neglect",
  "panic",
  "pity",
  "rage",
  "rapture",
  "revulsion",
  "satisfaction",
  "scorn",
  "sentimentality",
  "shame",
  "woe",
  "wrath"
];

// Construct an array that is a sequence of numbers as long as the
// word list
const wordindex = Array(wordlist.length);
for (let i = 0; i < wordlist.length; i++) {
  wordindex[i] = i;
}
// Preallocate for the tripletIdList, which is used to enforce
// uniqueness over the number of triplets.
const tripletIdList = Array(wordlist.length * 2);
// Construct triplets by sampling
for (let i = 0; i < nTriplets; i++) {
  let tripletIdA = this.random.sample(wordindex, 3);;
  let tripletIdB = [];
  let isDuplicated = true; // set as true to begin while loop
  while (isDuplicated === true) {
    isDuplicated = false; // set as false to prevent infinite loop
                          // when i === 0 
    tripletIdA = this.random.sample(wordindex, 3);
    tripletIdB = [tripletIdA[0], tripletIdA[2], tripletIdA[1]];
    for (let j = 0; j < i; j++) {
      isDuplicated = tripletIdA.every(function(value, index) {
        return value === tripletIdList[j][index]
      });
      if (isDuplicated === true) {
        break;
      }
      isDuplicated = tripletIdB.every(function(value, index) {
        return value === tripletIdList[j][index]
      });
      if (isDuplicated === true) {
        break;
      }
    } // end inner for loop
  } // end while loop
  // Record the current tripletId array in the tripletIdList
  tripletIdList[i] = tripletIdA;
  
  // Record the triplet in the loop template
  this.options.templateParameters[i].cue  = wordlist[tripletIdA[0]];
  this.options.templateParameters[i].opt1 = wordlist[tripletIdA[1]];
  this.options.templateParameters[i].opt2 = wordlist[tripletIdA[2]];

  // Record the tripletId in the loop template
  this.options.templateParameters[i].cueId  = tripletIdA[0];
  this.options.templateParameters[i].opt1Id = tripletIdA[1];
  this.options.templateParameters[i].opt2Id = tripletIdA[2];
} // end outter for loop
}
      },
      "title": "Triplet Task Loop",
      "scrollTop": true,
      "shuffleGroups": [],
      "template": {
        "type": "lab.html.Screen",
        "files": {},
        "responses": {
          "keypress(j)": "opt1",
          "keypress(k)": "opt2"
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "Trial",
        "content": "\u003Cmain class=\"content-vertical-top content-horizontal-center\"\u003E\r\n\t\u003Cdiv class=\"w-l\"\u003E\r\n\t\u003Ctable class=\"table-plain\" style=\"font-size: x-large; width:100%\"\u003E\r\n\t\t\u003Ctr\u003E\r\n\t\t\t\u003Ctd id=\"cue\" colspan=\"2\"\u003E${ parameters.cue }\u003C\u002Ftd\u003E\r\n\t\t\u003C\u002Ftr\u003E\r\n\t\t\u003Ctr\u003E\r\n\t\t\t\u003Ctd id=\"opt1\" style=\"width:50%;\"\u003E${ parameters.opt1 }\u003C\u002Ftd\u003E\r\n\t\t\t\u003Ctd id=\"opt2\" style=\"width:50%;\"\u003E${ parameters.opt2 }\u003C\u002Ftd\u003E\r\n\t\t\u003C\u002Ftr\u003E\r\n\t\u003C\u002Ftable\u003E\r\n\t\t\t\u003Ctable\u003E\r\n\t\t\t\u003Cthead\u003E\r\n\t\t\t\t\u003Ctr\u003E\r\n\t\t\t\t\t\u003Cth\u003E&larr;\u003C\u002Fth\u003E\r\n\t\t\t\t\t\u003Cth\u003E&rarr;\u003C\u002Fth\u003E\r\n\t\t\t\t\u003C\u002Ftr\u003E\r\n\t\t\t\u003C\u002Fthead\u003E\r\n\t\t\t\u003Ctbody\u003E\r\n\t\t\t\t\u003Ctr\u003E\r\n\t\t\t\t\t\u003Ctd\u003E\u003Ckbd\u003Ej\u003C\u002Fkbd\u003E\u003C\u002Ftd\u003E\r\n\t\t\t\t\t\u003Ctd\u003E\u003Ckbd\u003Ek\u003C\u002Fkbd\u003E\u003C\u002Ftd\u003E\r\n\t\t\t\t\u003C\u002Ftr\u003E\r\n\t\t\t\u003C\u002Ftbody\u003E\r\n\t\t\u003C\u002Ftable\u003E\r\n\t\t\u003C\u002Fdiv\u003E\r\n\u003C\u002Fmain\u003E\r\n"
      }
    }
  ]
})

// Let's go!
study.run()

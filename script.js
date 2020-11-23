// Define study
const nTriplets = 100;
const wordlist = [
  "insult",
  "bliss",
  "panic",
  "caring",
  "homesickness",
  "envy",
  "liking",
  "regret",
  "ecstasy",
  "sympathy",
  "horror",
  "alarm",
  "gloom",
  "love",
  "relief",
  "hate",
  "pity",
  "surprise",
  "joy",
  "depression",
  "outrage",
  "terror",
  "cheerfulness",
  "unhappiness",
  "amusement",
  "rage",
  "optimism",
  "glumness",
  "attraction",
  "fear"
]
const validation_triplet_index = [38, 24, 123, 71, 216, 217, 485, 785, 564, 551, 554, 804, 976, 1148, 1077, 1039, 1105, 1062, 1246, 1390, 1373, 1287, 1384, 1610, 1630, 1796, 1665, 1861, 1894, 1918, 2183, 2086, 2098, 2169, 2092, 2320, 2481, 2445, 2471, 2581, 2601, 2682, 2888, 2996, 3015, 2883, 2926, 3116, 3266, 3422, 3406, 3463, 3635, 3495, 3846, 3728, 3965, 3971, 3926, 3975, 4387, 4235, 4416, 4281, 4409, 4465, 4817, 4844, 4539, 4674, 4694, 4789, 5130, 4924, 5230, 5039, 5191, 5220, 5278, 5285, 5605, 5420, 5342, 5592, 5992, 5889, 5953, 5911, 5958, 5983, 6100, 6200, 6144, 6254, 6274, 6338, 6528, 6567, 6592, 6827, 6881, 6550, 7280, 7233, 7046, 7069, 7294, 7108, 7309, 7461, 7339, 7378, 7492, 7577, 7759, 8094, 7734, 8031, 8115, 8063, 8136, 8259, 8449, 8502, 8484, 8439, 8581, 8780, 8699, 8613, 8814, 8771, 9026, 9286, 8982, 9003, 9092, 9253, 9445, 9552, 9422, 9401, 9731, 9738, 9751, 9978, 10072, 10126, 9786, 10087, 10362, 10273, 10484, 10513, 10443, 10499, 10585, 10625, 10664, 10591, 10740, 10827, 10967, 11084, 10982, 11246, 11143, 11357, 11448, 11464, 11616, 11738, 11689, 11768, 12031, 12106, 11888, 11875, 11878, 11944];
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
// of k items from n items [0,n). Yields in ascending order.
// source: https://stackoverflow.com/a/36345790/1277193
  const out = Array(k);
  let curIndex = choose(n, k);
  let nCk = curIndex;
  for (let i = k; i > 0; i--) {
    nCk = nCk * i;
    nCk = Math.floor(nCk / n);
    while ((curIndex - nCk) > index) {
      curIndex = curIndex - nCk;
      nCk *= (n - i);
      nCk -= (nCk % i);
      n -= 1;
      nCk = Math.floor(nCk / n);
    }
    n = n - 1;
    out[i - 1] = n
  }
  return out
}
function combination2index(combination) {
// Returns the (0-based) index the given combination would have if it were in
// a reverse-lexicographically sorted list of combinations of choices of
// len(combination) items from any possible number of items (given the
// combination's length and maximum value)
  let result = 0;
  for (let i = 0; i < combination.length; i++) {
    result += choose(combination[i], i + 1)
  }
  return result
}
function n_triplets(n) {
  return n * choose(n - 1, 2);
}
function index2triplet(index, n) {
  const triplet = Array(3);
  N = choose(n - 1, 2);
  triplet[0] = Math.floor(index / N);
  tmp = index % N;
  opts = index2combination(tmp, n, 2);
  triplet[1] = opts[0] < triplet[0] ? opts[0] : opts[0] + 1;
  triplet[2] = opts[1] < triplet[0] ? opts[1] : opts[1] + 1;
  return triplet;
}
function triplet2index(triplet, n) {
// Triplet should be a reference index, followed pair of numbers corresponding
// to a unique combination specified in ascending order. That is, for [ref,
// opt1, opt2], opt1 < opt2.
  const opts = Array(2);
  const N = choose(n - 1, 2);
  let index = triplet[0] * N;
  opts[0] = triplet[1] > triplet[0] ? triplet[1] - 1 : triplet[1]
  opts[1] = triplet[2] > triplet[0] ? triplet[2] - 1 : triplet[2]
  index += combination2index(opts);
  return index;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sample_triplet_indexes(size, n, validation = null) {
  let N = n_triplets(n);
  if (N < size) {
    size = N;
    console.log("sample_triplets::warning: the requested sample size is larger than the total number of triplets. Returning population.")
    return seq(0, N)
  }
  let k;
  let sample;
  if (validation) {
  	k = validation.length;
    sample = Array(size - validation.length).concat(validation);
  } else {
    k = 0;
    sample = Array(size);
  }
  let index;
  for (let i = (size - k - 1); i >= 0; i--) {
    index = getRandomInt(0, N);
    while (sample.includes(index, i)) {
      index = getRandomInt(0, N);
    }
    sample[i] = index;
  }
  return(sample);
}
function getRandomSubarray(arr, size) {
// This implements a partial sort because number of triplets >> sample size.
// source: https://stackoverflow.com/a/11935263/1277193 
    const shuffled = arr.slice(0);
    let i = arr.length;
    let min = i - size;
    let temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function makeLoopTemplate(index, wordlist, nvalidation) {
    const size = index.length;
    const nexp = size - nvalidation;
    const n = wordlist.length;
    const X = Array(size);
    for (let i = 0; i < size; i++) {
        let triplet = index2triplet(index[i], n);
        if (Math.random > 0.5) {
            [triplet[1], triplet[2]] = [array[2], array[1]];
        }
        X[i] = {
            trialId: i,
            cueId: triplet[0],
            opt1Id: triplet[1],
            opt2Id: triplet[2],
            cue: wordlist[triplet[0]],
            opt1: wordlist[triplet[1]],
            opt2: wordlist[triplet[2]],
            cond: i < nexp ? "exp" : "val"
        }
    }
    return X
}
const total_size = 150;
const nvalidation = 30;
exp_triplet_index = sample_triplet_indexes(total_size, wordlist.length, getRandomSubarray(validation_triplet_index, nvalidation));
exp_loop_template = shuffle(makeLoopTemplate(exp_triplet_index, wordlist, nvalidation));

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
      "templateParameters": exp_loop_template,
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
        "before:prepare": function anonymous()
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

"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const workoutBtn = document.getElementById("workoutBtn");
const deleteWorkoutBtn = document.getElementById("deleteWorkoutBtn");

const workoutForm = document.getElementById("workoutForm");
const workoutNameInput = document.getElementById("workoutNameInput");

const workoutCount = document.getElementById("workoutCount");
const workoutsList = document.getElementById("workoutsList");

const activeWorkoutTitle = document.getElementById("activeWorkoutTitle");
const activeWorkoutInfo = document.getElementById("activeWorkoutInfo");

const exerciseCount = document.getElementById("exerciseCount");
const setCount = document.getElementById("setCount");
const volumeCount = document.getElementById("volumeCount");

const exerciseForm = document.getElementById("exerciseForm");
const exerciseNameInput = document.getElementById("exerciseNameInput");
const weightInput = document.getElementById("weightInput");
const repsInput = document.getElementById("repsInput");

const exercisesList = document.getElementById("exercisesList");

const workoutTimerBox = document.getElementById("workoutTimerBox");
const workoutTimer = document.getElementById("workoutTimer");

const workoutHistoryList = document.getElementById("workoutHistoryList");

const workoutHeroImage = document.getElementById("workoutHeroImage");
const changeImageBtn = document.getElementById("changeImageBtn");
const workoutDescriptionInput = document.getElementById(
  "workoutDescriptionInput",
);

const imageInput = document.getElementById("imageInput");
const setTypeInput = document.getElementById("setTypeInput");

const finishModal = document.getElementById("finishModal");
const finishYesBtn = document.getElementById("finishYesBtn");
const finishNoBtn = document.getElementById("finishNoBtn");

const weekSelect = document.getElementById("weekSelect");
const activeWeekLabel = document.getElementById("activeWeekLabel");
const completeWeekBtn = document.getElementById("completeWeekBtn");

const weekCompleteModal = document.getElementById("weekCompleteModal");
const weekCompleteOkBtn = document.getElementById("weekCompleteOkBtn");
const weekCompleteTitle = document.getElementById("weekCompleteTitle");

const setsAmountInput = document.getElementById("setsAmountInput");

const finishDuration = document.getElementById("finishDuration");
const finishSets = document.getElementById("finishSets");
const finishVolume = document.getElementById("finishVolume");

const themeToggleBtn = document.getElementById("themeToggleBtn");

const activeWorkoutBar = document.getElementById("activeWorkoutBar");
const barWorkoutTimer = document.getElementById("barWorkoutTimer");
const barExerciseProgress = document.getElementById("barExerciseProgress");
const barEndWorkoutBtn = document.getElementById("barEndWorkoutBtn");

const exportDataBtn = document.getElementById("exportDataBtn");
const importDataBtn = document.getElementById("importDataBtn");
const importDataInput = document.getElementById("importDataInput");

// ======================================================
// APP STATE
// ======================================================

let workouts = [];

let activeWorkoutId = null;

let workoutTimerInterval = null;

let editingExerciseId = null;

let activeWeek = 1;
let completedWeeks = [];
let personalRecords = {};

let completedWorkoutsThisWeek = 0;

let theme = "dark";

const exerciseLibrary = {
  "upper a": [
    {
      group: "1. Upper chest press",
      exercises: [
        "Tlaky na hrudník multipress (incline lavička)",
        "Tlaky na hrudník jednoručky (incline lavička)",
        'Obľúbený stroj na hrudník ("vrch" ideál)',
        "Tlaky na hrudník s veľkou tyčou (incline lavička)",
      ],
    },
    {
      group: "2. Middle back",
      exercises: [
        "Incline DB row",
        "T-bar row",
        "Seated row stroj",
        "Veslá v sede so širokým adaptérom",
      ],
    },
    {
      group: "3. Chest fly",
      exercises: [
        "Peck Deck",
        "Strihy na prsia na kladkách zhora dole",
        "Strihy na prsia na kladkách zdola hore",
      ],
    },
    {
      group: "4. Back width",
      exercises: [
        "Hrazda nadhmatom",
        "Sťahovanie kladky nadhmatom / MAG grip",
        "Stroj sťahovanie zhora dole",
        "Pomocná hrazda nadhmatom",
      ],
    },
    {
      group: "5. Shoulder press",
      exercises: [
        "Tlaky na ramená s jednoručkami v sede",
        "Tlaky na ramená na multipresse v sede",
        "Military press / Overhead press",
        "Tlakový stroj na ramená",
      ],
    },
    {
      group: "6. Side delts",
      exercises: [
        "Upažovanie na ramená s jednoručkami",
        "Upažovanie na ramená na stroji",
        "Upažovanie na ramená na spodnej kladke",
        "Príťahy k brade na multipresse",
      ],
    },
    {
      group: "7. Biceps stretch",
      exercises: [
        "Preacher curls jednoručka",
        "Preacher curls na stroji",
        "Biceps na spodných kladkách za telom",
        "Bicepsový zdvih v sede s jednoručkami",
      ],
    },
    {
      group: "8. Triceps isolation",
      exercises: [
        "Sťahovanie kladky na triceps",
        "Sťahovanie kladky za hlavou",
        "Skullcrusher",
        "Poliquin triceps pushdown",
      ],
    },
    {
      group: "9. Freedom upper body",
      exercises: [
        "Zadné ramená / Reverse Peck Deck",
        "1 séria bicepsu a tricepsu navyše",
        "Cvik na šírku chrbta",
      ],
    },
  ],

  "legs a": [
    {
      group: "1. Squat pattern dvojnožne",
      exercises: [
        "Multipress drepy",
        "Leg press dvojnožne",
        "Hacken squat",
        "Pendulum squat",
        "V-squat",
        "Voľná váha drepy",
      ],
    },
    {
      group: "2. Hamstring izolovane",
      exercises: ["Zákopy v sede", "Zákopy ležmo"],
    },
    {
      group: "3. Predok stehien - rectus femoris",
      exercises: ["Predkopy", "Sissy squats"],
    },
    {
      group: "4. Lýtka",
      exercises: [
        "Výpony na lýtka s vystretým kolenom (naj voľba)",
        "Výpony na lýtka v sede (výnimočne používame)",
      ],
    },
    {
      group: "5. Brucho - flexia chrbtice",
      exercises: [
        "Brušáky na kladke",
        "Zdvíhanie nôh vo vise / opreté lakte",
        "Iný obľúbený cvik / stroj na brucho",
      ],
    },
    {
      group: "6. Freedom exercise spodok tela",
      exercises: ["Addukcie", "Abdukcie", "Brucho ľubovoľný cvik"],
    },
    {
      group: "7. Freedom exercise spodok tela",
      exercises: ["Addukcie", "Abdukcie", "Brucho ľubovoľný cvik"],
    },
  ],

  "fullbody a": [
    {
      group: '1. "stred" hrudníka tlak',
      exercises: [
        "Tlaky na hrudník multipresse (rovná lavička)",
        "Tlaky na hrudník jednoručky (rovná lavička)",
        'Obľúbený stroj na hrudník ("stred" ideál)',
        "Tlaky na hrudník s veľkou tyčou (rovná lavička)",
      ],
    },

    {
      group: "2. Strihy na prsia na kladkách zdola hore",
      exercises: ["Strihy na prsia na kladkách zdola hore"],
    },

    {
      group: "3. Hip hinge pohyb - zadný reťazec",
      exercises: [
        "Rumunský mŕtvy ťah (RDL) s veľkou tyčou",
        "Hyperextenzia (videotechnika)",
        "RDL s jednoručkami (ak ti stačia jednoručky)",
      ],
    },

    {
      group: "4. Šírka chrbta sagitálna rovina",
      exercises: [
        "Hrazda podhmatom (+ závažie ak si silný)",
        "Sťahovanie kladky podhmatom",
        "Stroj kde sťahuješ zhora dole s lakťami pred telom (neutrálny)",
      ],
    },

    {
      group: "5. Ramená tlaky",
      exercises: [
        "Tlaky na ramená s jednoručkami v sede",
        "Tlaky na ramená na multipresse v sede",
        "Military press / overhead press (veľká tyč v stoji tlaky)",
        "Tlakový stroj na ramená (bočný / predný úchop)",
      ],
    },

    {
      group: "6. Primárne bočné ramená",
      exercises: [
        "Upažovanie na ramená s jednoručkami",
        "Upažovanie na ramená na stroji",
        "Upažovanie na ramená na spodnej kladke",
        "Prítahy k brade na multipresse (videotechnika)",
      ],
    },

    {
      group: "7. Stred chrbta",
      exercises: [
        "Incline DB row (videotechnika)",
        "T-bar row",
        "Seated row stroj (lakte od tela)",
        "Veslá v sede so širokým adaptérom (lakte od tela)",
      ],
    },

    {
      group: "8. Biceps supinované bez streču",
      exercises: [
        "Biceps jednoručky v sede / stoji / opretý lakeť",
        "Bicepsový zdvih s rovnou tyčou (nachylne na preťaženia)",
        "Bicepsový zdvih s EZ tyčou (šetrnejšie na úpony)",
        "Iný cvik na biceps ktorý máš rád",
      ],
    },

    {
      group: "9. Triceps izolované",
      exercises: [
        "Sťahovanie kladky na triceps (akýkoľvek adapter)",
        "Sťahovanie kladky za hlavou",
        "Scullcrusher (videotechnika)",
        "Poliquin triceps pushdown (videotechnika)",
      ],
    },
  ],

  "fullbody b": [
    {
      group: "1. Hrudník fly pohyb",
      exercises: [
        "Peckdeck (naj voľba)",
        "Strihy na prsia na kladkách zhora dole",
        "Strihy na prsia na kladkách zdola hore",
      ],
    },

    {
      group: "2. Triceps tlakový cvik",
      exercises: [
        "Dipy na triceps (odporová guma / závažie)",
        "JM press na multipresse (videotechnika)",
        "Zatláčanie na triceps v sede na stroji",
        "Diamantové kľuky",
      ],
    },

    {
      group: "3. Predok stehien - rectus femoris",
      exercises: [
        "Predkopy (jednonožne / dvojnožne / kombo)",
        "Sissy squat (videotechnika)",
      ],
    },

    {
      group: "4. Squat pattern jednonožne",
      exercises: [
        "Výpady na multipresse dozadu (+ prinožiť)",
        "Bulharské drepy na multipresse",
        "Bulharské drepy s jednoručkami",
        "Leg press jednonožne",
        "Výpady v chôdzi",
      ],
    },

    {
      group: "5. Šírka chrbta jednoručné cviky",
      exercises: [
        "Cable lower row (videotechnika)",
        "Lower row stroj (lakeť je pri tele)",
        "Dumbbell row (píla s jednoručkou)",
      ],
    },

    {
      group: "6. Primárne bočné ramená",
      exercises: [
        "Upažovanie na ramená s jednoručkami",
        "Upažovanie na ramená na stroji",
        "Upažovanie na ramená na spodnej kladke",
        "Prítahy k brade na multipresse (videotechnika)",
      ],
    },

    {
      group: "7. Zadné ramená",
      exercises: [
        "Reverse peck deck (naj voľba)",
        "Zadné ramená na protismerných kladkách",
        "Zadné ramená s jednoručkami v predklone",
      ],
    },

    {
      group: "8. Freedom exercise fullbody",
      exercises: [
        "Obľúbený cvik na brucho",
        "Lýtka",
        "Biceps kladivá",
        "Nič, stačilo mi dnes",
      ],
    },
  ],
};

// ======================================================
// STORAGE SYSTEM
// ======================================================

function saveData() {
  const data = {
    workouts: workouts,
    activeWorkoutId: activeWorkoutId,
    activeWeek: activeWeek,
    completedWeeks: completedWeeks,
    completedWorkoutsThisWeek: completedWorkoutsThisWeek,
    theme: theme,
    personalRecords: personalRecords,
  };

  localStorage.setItem("gymPlanPro", JSON.stringify(data));
}

function loadData() {
  const storedData = localStorage.getItem("gymPlanPro");

  if (!storedData) return;

  const data = JSON.parse(storedData);

  workouts = data.workouts || [];
  activeWorkoutId = data.activeWorkoutId || null;
  activeWeek = data.activeWeek || 1;
  completedWeeks = data.completedWeeks || [];
  completedWorkoutsThisWeek = data.completedWorkoutsThisWeek || 0;
  theme = data.theme || "dark";
  personalRecords = data.personalRecords || {};

  workouts.forEach((workout) => {
    if (!workout.muscleGroups || workout.muscleGroups === "undefined") {
      workout.muscleGroups = getMuscleGroups(workout.name);
    }

    if (!workout.image || workout.image === "undefined") {
      workout.image = getWorkoutImage(workout.name);
    }

    if (!workout.description) {
      workout.description = getWorkoutDescription(workout.name);
    }

    if (!workout.timer) {
      workout.timer = {
        started: false,
        startedAt: null,
        totalTime: 0,
        history: [],
      };
    }

    if (workout.weekCompleted === undefined) {
      workout.weekCompleted = false;
    }

    if (!workout.timer.history) {
      workout.timer.history = [];
    }

    workout.exercises.forEach((exercise) => {
      if (exercise.done === undefined) {
        exercise.done = false;
      }

      if (!exercise.description) {
        exercise.description = "";
      }

      if (!workout.weekData) {
        workout.weekData = {};
      }

      if (!workout.weekData[activeWeek]) {
        workout.weekData[activeWeek] = structuredClone(workout.exercises || []);
      }

      exercise.sets.forEach((set, index) => {
        if (!set.note) {
          set.note = "";
        }

        if (!set.type) {
          if (index === 0) {
            set.type = "progress";
          } else if (index === 1) {
            set.type = "bodybuilding";
          } else {
            set.type = "fun";
          }
        }
      });
    });
  });
}

// ======================================================
// WORKOUT HELPERS
// ======================================================

function getActiveWorkout() {
  return workouts.find((workout) => {
    return workout.id === activeWorkoutId;
  });
}

function getActiveWeekExercises() {
  const workout = getActiveWorkout();

  if (!workout) return [];

  if (!workout.weekData) {
    workout.weekData = {};
  }

  if (!workout.weekData[activeWeek]) {
    let sourceExercises = [];

    for (let week = activeWeek - 1; week >= 1; week--) {
      if (workout.weekData[week] && workout.weekData[week].length > 0) {
        sourceExercises = workout.weekData[week];
        break;
      }
    }

    if (sourceExercises.length === 0) {
      sourceExercises = workout.exercises || [];
    }

    workout.weekData[activeWeek] = structuredClone(sourceExercises);

    workout.weekData[activeWeek].forEach((exercise) => {
      exercise.done = false;

      exercise.sets.forEach((set) => {
        set.isPR = false;
      });
    });

    saveData();
  }

  return workout.weekData[activeWeek];
}

function updateActiveWorkoutIfNeeded() {
  if (workouts.length === 0) {
    activeWorkoutId = null;
    return;
  }

  const activeWorkoutExists = workouts.some((workout) => {
    return workout.id === activeWorkoutId;
  });

  if (!activeWorkoutExists) {
    activeWorkoutId = workouts[0].id;
  }
}

function getWorkoutElapsedTime(workout) {
  if (!workout.timer) return 0;

  if (workout.timer.started && workout.timer.startedAt) {
    return workout.timer.totalTime + (Date.now() - workout.timer.startedAt);
  }

  return workout.timer.totalTime;
}

function getMuscleGroups(workoutName) {
  const name = workoutName.toLowerCase();

  if (name.includes("push")) {
    return "Chest, Shoulders, Trices";
  }

  if (name.includes("pull")) {
    return "Back, Biceps";
  }

  if (name.includes("leg")) {
    return "Quads, Hamstrings, Glutes";
  }

  if (name.includes("upper")) {
    return "Chest, Back, Shoulders, Arms";
  }

  if (name.includes("full")) {
    return "Full Body";
  }

  if (name.includes("default") || name.includes("custom")) {
    return "Custom Workout";
  }

  return "Custom workout";
}

function getWorkoutImage(workoutName) {
  const name = workoutName.toLowerCase();

  if (name.includes("push")) {
    return "images/chest.jpg";
  }

  if (name.includes("pull")) {
    return "images/back.jpg";
  }

  if (name.includes("leg")) {
    return "images/legs.jpg";
  }

  if (name.includes("upper")) {
    return "images/upper.jpg";
  }

  if (name.includes("full")) {
    return "images/full-body.jpg";
  }

  return "images/default-workout.jpg";
}

function getWorkoutDescription(workoutName) {
  const name = workoutName.toLowerCase();

  if (name.includes("push")) {
    return "Chest, shoulders and triceps focused workout.";
  }
  if (name.includes("pull")) {
    return "Back and biceps focused workout.";
  }

  if (name.includes("leg")) {
    return "Quads, hamstrings, glutes and calves focused workout.";
  }

  if (name.includes("upper")) {
    return "Chest, back, shoulders and arms focused workout.";
  }

  if (name.includes("full")) {
    return "Full body workout targeting all major muscle groups.";
  }

  return "Custom workout plan.";
}

function getWorkoutKey(workoutName) {
  const name = workoutName.toLowerCase().trim();

  if (name.includes("upper") && name.includes("a")) {
    return "upper a";
  }

  if (name.includes("legs") && name.includes("a")) {
    return "legs a";
  }

  if (name.includes("full") && name.includes("a")) {
    return "fullbody a";
  }

  if (name.includes("full") && name.includes("b")) {
    return "fullbody b";
  }

  return name;
}

function showWeekCompleteModal() {
  weekCompleteTitle.textContent = `Week ${activeWeek} is finished`;
  weekCompleteModal.classList.remove("hidden");
}

function hideWeekCompleteModal() {
  weekCompleteModal.classList.add("hidden");
}

function renderExerciseOptions() {
  const workout = getActiveWorkout();

  exerciseNameInput.innerHTML = `<option value="">Choose exercise...</option>`;

  if (!workout) return;

  const workoutKey = getWorkoutKey(workout.name);

  const groups = exerciseLibrary[workoutKey];

  if (!groups) return;

  groups.forEach((group) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group.group;

    group.exercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise;

      optgroup.appendChild(option);
    });

    exerciseNameInput.appendChild(optgroup);
  });
}

function getExercisePR(exerciseName) {
  return (
    personalRecords[exerciseName] || {
      weight: 0,
      reps: 0,
    }
  );
}

function isNewPR(exerciseName, weight, reps) {
  if (activeWeek === 1) return false;

  const currentPR = getExercisePR(exerciseName);

  if (currentPR.weight === 0 && currentPR.reps === 0) return false;

  if (weight > currentPR.weight) return true;

  if (weight === currentPR.weight && reps > currentPR.reps) {
    return true;
  }

  return false;
}

function updateExercisePR(exerciseName, weight, reps) {
  const currentPR = getExercisePR(exerciseName);

  if (activeWeek === 1) {
    personalRecords[exerciseName] = {
      weight: weight,
      reps: reps,
    };

    return false;
  }

  if (!isNewPR(exerciseName, weight, reps)) return false;

  personalRecords[exerciseName] = {
    weight: weight,
    reps: reps,
  };

  return true;
}

function syncExerciseToFutureWeeks(workout, exercise) {
  if (!workout.weekData) return;

  Object.keys(workout.weekData).forEach((weekKey) => {
    const weekNumber = Number(weekKey);

    if (weekNumber <= activeWeek) return;

    const futureExercises = workout.weekData[weekKey];

    let futureExercise = futureExercises.find((futureExercise) => {
      return futureExercise.name.toLowerCase() === exercise.name.toLowerCase();
    });

    const copiedExercise = structuredClone(exercise);

    copiedExercise.done = false;

    copiedExercise.sets.forEach((set) => {
      set.isPR = false;
    });

    if (!futureExercise) {
      futureExercises.push(copiedExercise);
      return;
    }

    copiedExercise.sets.forEach((copiedSet, index) => {
      const futureSet = futureExercise.sets[index];

      if (!futureSet) {
        futureExercise.sets.push(structuredClone(copiedSet));
        return;
      }

      const futureSetIsEmpty =
        !Number(futureSet.weight) && !Number(futureSet.reps);

      if (futureSetIsEmpty) {
        futureSet.weight = copiedSet.weight;
        futureSet.reps = copiedSet.reps;
        futureSet.type = copiedSet.type;
        futureSet.note = copiedSet.note || "";
        futureSet.isPR = false;
      }

      if (copiedSet.type === "fun") {
        futureSet.note = copiedSet.note || "";
      }
    });

    futureExercise.description =
      futureExercise.description || copiedExercise.description;
    futureExercise.done = false;
  });
}

function exportData() {
  const data = localStorage.getItem("gymPlanPro");

  if (!data) return;

  const blob = new Blob([data], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "gymplan-pro-backup.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function importData(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    try {
      const importedData = JSON.parse(reader.result);

      if (!importedData.workouts) {
        alert("Invalid GymPlan PRO backup file.");
        return;
      }

      localStorage.setItem("gymPlanPro", JSON.stringify(importedData));

      location.reload();
    } catch (error) {
      alert("Import failed. Wrong file format.");
    }
  };

  reader.readAsText(file);
}

// ======================================================
// WORKOUT FORMAT TIME
// ======================================================

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startWorkout() {
  const workout = getActiveWorkout();

  if (!workout) return;

  workout.timer.started = true;
  workout.timer.startedAt = Date.now();

  workoutBtn.classList.add("active");
  workoutBtn.innerHTML = `<span class="workout-btn-dot"></span> End Workout`;

  clearInterval(workoutTimerInterval);

  workoutTimerInterval = setInterval(() => {
    renderWorkoutDetail();
  }, 1000);

  renderActiveWorkoutBar();
  saveData();
}

function endWorkout() {
  const workout = getActiveWorkout();

  if (!workout) return;

  const finalTime = getWorkoutElapsedTime(workout);

  workout.timer.history.push({
    id: Date.now(),
    date: formatWorkoutDate(),
    time: finalTime,
  });

  workout.timer.totalTime = 0;
  workout.timer.started = false;
  workout.timer.startedAt = null;

  workoutBtn.classList.remove("active");
  workoutBtn.innerHTML = `<span class="workout-btn-dot"></span> Start Workout`;

  clearInterval(workoutTimerInterval);

  saveData();
  renderAll();
}

function toggleWorkoutTimer() {
  const workout = getActiveWorkout();

  if (!workout) return;

  if (workout.timer.started) {
    endWorkout();
  } else {
    startWorkout();
  }
}

// ======================================================
// WORKOUT ACTIONS
// ======================================================

function addWorkout() {
  if (workouts.length >= 6) return;

  const workoutName = workoutNameInput.value.trim();

  if (workoutName === "") return;

  const workout = {
    id: Date.now(),
    name: workoutName,
    muscleGroups: getMuscleGroups(workoutName),
    image: getWorkoutImage(workoutName),
    description: getWorkoutDescription(workoutName),

    weekCompleted: false,

    exercises: [],
    timer: {
      started: false,
      startedAt: null,
      totalTime: 0,
      history: [],
    },
  };

  workouts.push(workout);

  activeWorkoutId = workout.id;

  saveData();
  renderAll();

  workoutForm.reset();
}

function deleteActiveWorkout() {
  workouts = workouts.filter((workout) => {
    return workout.id !== activeWorkoutId;
  });

  activeWorkoutId = null;

  updateActiveWorkoutIfNeeded();
  saveData();
  renderAll();
}

function setActiveWorkout(id) {
  activeWorkoutId = id;

  saveData();
  renderAll();
}

function applyTheme() {
  document.body.classList.toggle("light-theme", theme === "light");

  themeToggleBtn.innerHTML =
    theme === "light"
      ? `<i class="fa-solid fa-sun"></i> Light Mode`
      : `<i class="fa-solid fa-moon"></i> Dark Mode`;
}

function toggleTheme() {
  theme = theme === "dark" ? "light" : "dark";

  saveData();
  applyTheme();
}

// ======================================================
// EXERCISE ACTIONS
// ======================================================

function addExercise() {
  const workout = getActiveWorkout();

  if (!workout) return;

  const exerciseName = exerciseNameInput.value.trim();
  const weight = Number(weightInput.value);
  const reps = Number(repsInput.value);
  const setsAmount = Number(setsAmountInput.value);

  if (exerciseName === "") return;

  const exercises = getActiveWeekExercises();

  let exercise = exercises.find((exercise) => {
    return exercise.name.toLowerCase() === exerciseName.toLowerCase();
  });

  if (!exercise) {
    exercise = {
      id: Date.now(),
      name: exerciseName,
      description: "",
      done: false,
      sets: [],
    };

    exercises.push(exercise);
  }

  const hasWeight = weightInput.value !== "";
  const hasReps = repsInput.value !== "";
  const hasSetsAmount = setsAmountInput.value !== "";

  if (hasSetsAmount && !hasWeight && !hasReps) {
    if (setsAmount <= 0) return;

    for (let i = 0; i < setsAmount; i++) {
      exercise.sets.push({
        id: Date.now() + i,
        weight: 0,
        reps: 0,
        type: "default",
        note: "",
      });
    }
  }

  if (hasWeight && hasReps && !hasSetsAmount) {
    if (weight <= 0) return;
    if (reps <= 0) return;

    exercise.sets.push({
      id: Date.now() + 1,
      weight: weight,
      reps: reps,
      type: setTypeInput.value,
      note: "",
    });
  }

  if (hasWeight && hasReps && hasSetsAmount) {
    if (weight <= 0) return;
    if (reps <= 0) return;
    if (setsAmount <= 0) return;

    for (let i = 0; i < setsAmount; i++) {
      exercise.sets.push({
        id: Date.now() + i,
        weight: weight,
        reps: reps,
        type: setTypeInput.value,
        note: "",
      });
    }
  }

  syncExerciseToFutureWeeks(workout, exercise);
  saveData();
  renderAll();

  weightInput.value = "";
  repsInput.value = "";
  setsAmountInput.value = "";
  weightInput.focus();
}

function deleteExercise(id) {
  const workout = getActiveWorkout();

  if (!workout) return;

  const exercises = getActiveWeekExercises();

  workout.weekData[activeWeek] = exercises.filter((exercise) => {
    return exercise.id !== id;
  });

  saveData();
  renderAll();
}

function toggleExerciseDone(id) {
  const workout = getActiveWorkout();

  if (!workout) return;

  const exercises = getActiveWeekExercises();

  const exercise = exercises.find((exercise) => {
    return exercise.id === id;
  });

  if (!exercise) return;

  exercise.done = !exercise.done;

  saveData();
  renderAll();

  if (areAllExercisesDone(workout)) {
    showFinishModal();
  }
}

function deleteSet(exerciseId, setId) {
  const workout = getActiveWorkout();

  if (!workout) return;

  const exercises = getActiveWeekExercises();

  const exercise = exercises.find((exercise) => {
    return exercise.id === exerciseId;
  });

  if (!exercise) return;

  exercise.sets = exercise.sets.filter((set) => {
    return set.id !== setId;
  });

  saveData();
  renderAll();
}

function deleteHistory(id) {
  const workout = getActiveWorkout();

  if (!workout) return;

  workout.timer.history = workout.timer.history.filter((item) => {
    return item.id !== id;
  });

  saveData();
  renderAll();
}

function startEditExercise(id) {
  editingExerciseId = id;
  renderExercises();
}

function cancelEditExercise() {
  editingExerciseId = null;
  renderExercises();
}

function saveEditedSet(exerciseId) {
  const workout = getActiveWorkout();

  if (!workout) return;

  const exercises = getActiveWeekExercises();

  const exercise = exercises.find((exercise) => {
    return exercise.id === exerciseId;
  });

  if (!exercise) return;

  exercise.sets.forEach((set) => {
    const weightInput = document.querySelector(
      `.edit-set-weight[data-set-id="${set.id}"]`,
    );

    const repsInput = document.querySelector(
      `.edit-set-reps[data-set-id="${set.id}"]`,
    );

    const typeInput = document.querySelector(
      `.edit-set-type[data-set-id="${set.id}"]`,
    );

    const noteInput = document.querySelector(
      `.edit-set-note[data-set-id="${set.id}"]`,
    );

    if (!weightInput || !repsInput || !typeInput) return;

    const weight = Number(weightInput.value);
    const reps = Number(repsInput.value);

    const finalWeight = weight > 0 ? weight : 0;
    const finalReps = reps > 0 ? reps : 0;

    set.isPR = false;

    if (finalWeight > 0 && finalReps > 0) {
      set.isPR = updateExercisePR(exercise.name, finalWeight, finalReps);
    }

    set.weight = finalWeight;
    set.reps = finalReps;
    set.type = typeInput.value;
    set.note = noteInput ? noteInput.value : "";
  });

  syncExerciseToFutureWeeks(workout, exercise);

  editingExerciseId = null;

  saveData();
  renderAll();
}

function saveExerciseDescription(exerciseId) {
  const exercises = getActiveWeekExercises();

  const exercise = exercises.find((exercise) => {
    return exercise.id === exerciseId;
  });

  if (!exercise) return;

  const textarea = document.querySelector(
    `.exercise-description-input[data-id="${exerciseId}"]`,
  );

  if (!textarea) return;

  exercise.description = textarea.value;

  saveData();

  const saveBtn = document.querySelector(
    `.save-description[data-id="${exerciseId}"]`,
  );

  if (!saveBtn) return;

  saveBtn.textContent = "Saved ✓";

  setTimeout(() => {
    saveBtn.textContent = "Save Description";
  }, 1000);
}

// ======================================================
// STATS HELPERS
// ======================================================

function getTotalSets(workout) {
  const exercises = getActiveWeekExercises();

  return exercises.reduce((sum, exercise) => {
    return sum + exercise.sets.length;
  }, 0);
}

function getTotalVolume(workout) {
  const exercises = getActiveWeekExercises();

  let total = 0;

  exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      total += set.weight * set.reps;
    });
  });

  return total;
}

function formatWorkoutDate() {
  return new Date().toLocaleString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function areAllExercisesDone(workout) {
  if (!workout) return false;

  const exercises = getActiveWeekExercises();

  if (exercises.length === 0) return false;

  return exercises.every((exercise) => {
    return exercise.done === true;
  });
}

function showFinishModal() {
  const workout = getActiveWorkout();

  if (!workout) return;

  if (finishDuration) {
    finishDuration.textContent = formatTime(getWorkoutElapsedTime(workout));
  }

  if (finishSets) {
    finishSets.textContent = getTotalSets(workout);
  }

  if (finishVolume) {
    finishVolume.textContent = `${getTotalVolume(workout)} kg`;
  }

  finishModal.classList.remove("hidden");
}

function hideFinishModal() {
  finishModal.classList.add("hidden");
}

// ======================================================
// UI RENDERING
// ======================================================

function renderAll() {
  renderWorkouts();
  renderWorkoutDetail();
  renderWorkoutHistory();
  renderWeekCycle();
  renderExercises();
  renderExerciseOptions();
}

function renderWorkouts() {
  workoutsList.innerHTML = "";

  workoutCount.textContent = `${workouts.length}/6`;

  if (workouts.length === 0) {
    workoutsList.innerHTML = `
     <div class="empty-state">
        <h3>No workouts yet</h3>
        <p>Create your first workout.</p>
      </div>
    `;
    return;
  }

  workouts.forEach((workout) => {
    const button = document.createElement("button");

    button.classList.add("workout-tab");

    if (workout.id === activeWorkoutId) {
      button.classList.add("active");
    }

    button.dataset.id = workout.id;

    button.innerHTML = `
  <img src="${workout.image}" alt="${workout.name}" class="workout-tab-img">

  <div class="workout-tab-content">
    <strong>${workout.name}</strong>
    <span>${workout.muscleGroups}</span>
  </div>
`;

    workoutsList.appendChild(button);
  });
}

function renderActiveWorkoutBar() {
  const workout = getActiveWorkout();

  if (!activeWorkoutBar || !barWorkoutTimer || !barExerciseProgress) return;

  if (!workout || !workout.timer.started) {
    activeWorkoutBar.classList.add("hidden");
    return;
  }

  const exercises = getActiveWeekExercises();

  const doneExercises = exercises.filter((exercise) => {
    return exercise.done === true;
  }).length;

  activeWorkoutBar.classList.remove("hidden");

  barWorkoutTimer.textContent = formatTime(getWorkoutElapsedTime(workout));
  barExerciseProgress.textContent = `${doneExercises}/${exercises.length}`;
}

function renderWorkoutDetail() {
  const workout = getActiveWorkout();

  if (!workout) {
    activeWorkoutTitle.textContent = "Select workout";
    activeWorkoutInfo.textContent = "Create or choose a workout plan.";

    exerciseCount.textContent = "0";
    setCount.textContent = "0";
    volumeCount.textContent = "0 kg";

    workoutTimerBox.classList.add("hidden");
    workoutTimer.textContent = "00:00:00";

    workoutBtn.classList.remove("active");
    workoutBtn.innerHTML = `<span class="workout-btn-dot"></span> Start Workout`;

    workoutHeroImage.src = "";
    workoutDescriptionInput.value = "";

    deleteWorkoutBtn.disabled = true;
    activeWorkoutBar.classList.add("hidden");

    return;
  }

  activeWorkoutTitle.textContent = workout.name;
  const activeWeekExercises = getActiveWeekExercises();

  activeWorkoutInfo.textContent = `${activeWeekExercises.length} exercises in Week ${activeWeek}`;

  workoutHeroImage.src = workout.image;
  workoutDescriptionInput.value = workout.description;

  exerciseCount.textContent = activeWeekExercises.length;
  setCount.textContent = getTotalSets(workout);
  volumeCount.textContent = `${getTotalVolume(workout)} kg`;

  workoutTimer.textContent = formatTime(getWorkoutElapsedTime(workout));

  if (workout.timer.started) {
    workoutBtn.classList.add("active");
    workoutBtn.innerHTML = `<span class="workout-btn-dot"></span> End Workout`;
    workoutTimerBox.classList.remove("hidden");
  } else {
    workoutBtn.classList.remove("active");
    workoutBtn.innerHTML = `<span class="workout-btn-dot"></span> Start Workout`;

    if (getWorkoutElapsedTime(workout) > 0) {
      workoutTimerBox.classList.remove("hidden");
    } else {
      workoutTimerBox.classList.add("hidden");
    }
  }

  deleteWorkoutBtn.disabled = false;

  renderActiveWorkoutBar();
}

function renderWorkoutHistory() {
  workoutHistoryList.innerHTML = "";

  const workout = getActiveWorkout();

  if (!workout) return;

  if (!workout.timer.history || workout.timer.history.length === 0) {
    workoutHistoryList.innerHTML = "";
    return;
  }

  workoutHistoryList.innerHTML = `
    <div class="history-heading">
      <span>Workout history</span>
      <strong>${workout.timer.history.length}</strong>
    </div>
  `;

  workout.timer.history.forEach((item) => {
    const historyItem = document.createElement("div");

    historyItem.classList.add("history-item");

    historyItem.innerHTML = `
      <div>
        <span>${item.date}</span>
        <strong>${formatTime(item.time)}</strong>
      </div>

      <button class="delete-history" data-id="${item.id}">
        Delete
      </button>
    `;

    workoutHistoryList.appendChild(historyItem);
  });
}

function renderExercises() {
  exercisesList.innerHTML = "";

  const workout = getActiveWorkout();

  if (!workout) {
    exercisesList.innerHTML = `
      <div class="empty-state">
        <h3>Select workout first</h3>
        <p>Choose a workout from the sidebar.</p>
      </div>
    `;
    return;
  }

  const exercises = getActiveWeekExercises();

  if (exercises.length === 0) {
    exercisesList.innerHTML = `
      <div class="empty-state">
        <h3>No exercises yet</h3>
        <p>Add your first set above.</p>
      </div>
    `;
    return;
  }

  exercises.forEach((exercise) => {
    const exerciseVolume = exercise.sets.reduce((sum, set) => {
      return sum + set.weight * set.reps;
    }, 0);

    const card = document.createElement("article");
    card.classList.add("exercise-card");

    if (exercise.done) {
      card.classList.add("done");
    }

    card.innerHTML = `
      <div class="exercise-card-top">
        <div class="exercise-main">
          <h3>${exercise.name}</h3>
          <span>${exercise.sets.length} sets • ${exerciseVolume} kg volume</span>
        </div>

        <div class="exercise-actions">
          <button
            class="exercise-done-btn ${exercise.done ? "active" : ""}"
            data-id="${exercise.id}"
          >
            <i class="fa-solid fa-check"></i>
          </button>

          <div class="exercise-menu">
            <button class="exercise-menu-btn" data-id="${exercise.id}">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>

            <div class="exercise-dropdown hidden">
              ${
                editingExerciseId === exercise.id
                  ? `<button class="cancel-edit-exercise" data-id="${exercise.id}">Cancel</button>`
                  : `<button class="edit-exercise" data-id="${exercise.id}">Edit</button>`
              }

              <button class="delete-exercise" data-id="${exercise.id}">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="sets-list">
        ${exercise.sets
          .map((set, index) => {
            if (editingExerciseId === exercise.id) {
              return `
                <div class="set-row edit-set-row ${set.type}">
                  <span class="set-label">Set ${index + 1}</span>

                  <input
                    class="edit-set-weight"
                    data-set-id="${set.id}"
                    type="number"
                    value="${set.weight > 0 ? set.weight : ""}"
                    placeholder="kg"
                  />

                  <input
                    class="edit-set-reps"
                    data-set-id="${set.id}"
                    type="number"
                    value="${set.reps > 0 ? set.reps : ""}"
                    placeholder="reps"
                  />

                  <select
                    class="edit-set-type"
                    data-set-id="${set.id}"
                  >
                    <option value="progress" ${set.type === "progress" ? "selected" : ""}>
                      Progress
                    </option>

                    <option value="bodybuilding" ${set.type === "bodybuilding" ? "selected" : ""}>
                      Bodybuilding
                    </option>

                    <option value="fun" ${set.type === "fun" ? "selected" : ""}>
                      Fun
                    </option>
                  </select>

                  <button
                    class="save-set"
                    data-exercise-id="${exercise.id}"
                    data-set-id="${set.id}"
                  >
                    Save
                  </button>

                  <button
                    class="delete-set"
                    data-exercise-id="${exercise.id}"
                    data-set-id="${set.id}"
                  >
                    ×
                  </button>
                </div>

                ${
                  set.type === "fun"
                    ? `<textarea
                        class="edit-set-note"
                        data-set-id="${set.id}"
                        placeholder="Dropset, no rest, new technique..."
                      >${set.note || ""}</textarea>`
                    : ""
                }
              `;
            }

            return `
              <div class="set-row ${set.type} ${set.isPR ? "has-pr" : ""}">
                <span class="set-label">
                  Set ${index + 1}
                  ${
                    set.isPR
                      ? `<span class="set-pr-inline"><i class="fa-solid fa-fire"></i> PR</span>`
                      : ""
                  }
                </span>

                <strong>${set.weight > 0 ? `${set.weight} kg` : "— kg"}</strong>
                <strong>${set.reps > 0 ? `${set.reps} reps` : "— reps"}</strong>

                <span class="set-volume">
                  ${
                    set.weight > 0 && set.reps > 0
                      ? `${set.weight * set.reps} kg`
                      : "—"
                  }
                </span>
              </div>

              ${
                set.type === "fun" && set.note
                  ? `<div class="fun-set-note">${set.note}</div>`
                  : ""
              }
            `;
          })
          .join("")}
      </div>

      <div class="exercise-description-box">
        <textarea
          class="exercise-description-input"
          data-id="${exercise.id}"
          placeholder="Training notes, tempo, technique, RPE..."
        >${exercise.description}</textarea>

        <button
          class="save-description"
          data-id="${exercise.id}"
        >
          Save Description
        </button>
      </div>
    `;

    exercisesList.appendChild(card);
  });
}

function renderWeekCycle() {
  activeWeekLabel.textContent = `Week ${activeWeek}`;
  weekSelect.value = activeWeek;

  if (completedWeeks.includes(activeWeek)) {
    completeWeekBtn.textContent = "Completed ✓";
    completeWeekBtn.classList.add("active");
  } else {
    completeWeekBtn.textContent = "Complete Week";
    completeWeekBtn.classList.remove("active");
  }
}

function setActiveWeek(week) {
  activeWeek = week;

  saveData();
  renderAll();
}

function toggleCompleteWeek() {
  if (completedWeeks.includes(activeWeek)) {
    completedWeeks = completedWeeks.filter((week) => {
      return week !== activeWeek;
    });
  } else {
    completedWeeks.push(activeWeek);
  }

  saveData();
  renderWeekCycle();
}

// ======================================================
// FORM HANDLING
// ======================================================

workoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addWorkout();
});

exerciseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addExercise();
});

// ======================================================
// EVENT LISTENERS
// ======================================================

workoutsList.addEventListener("click", (e) => {
  const workoutTab = e.target.closest(".workout-tab");

  if (!workoutTab) return;

  const id = Number(workoutTab.dataset.id);

  setActiveWorkout(id);
});

deleteWorkoutBtn.addEventListener("click", () => {
  deleteActiveWorkout();
});

workoutBtn.addEventListener("click", toggleWorkoutTimer);

exercisesList.addEventListener("click", (e) => {
  const doneBtn = e.target.closest(".exercise-done-btn");

  if (doneBtn) {
    const id = Number(doneBtn.dataset.id);

    toggleExerciseDone(id);
    return;
  }

  const menuBtn = e.target.closest(".exercise-menu-btn");

  if (menuBtn) {
    document.querySelectorAll(".exercise-dropdown").forEach((dropdown) => {
      dropdown.classList.add("hidden");
    });

    const menu = menuBtn.closest(".exercise-menu");
    const dropdown = menu.querySelector(".exercise-dropdown");

    dropdown.classList.toggle("hidden");

    return;
  }

  const editExerciseBtn = e.target.closest(".edit-exercise");

  if (editExerciseBtn) {
    const id = Number(editExerciseBtn.dataset.id);

    startEditExercise(id);
    return;
  }

  const cancelEditBtn = e.target.closest(".cancel-edit-exercise");

  if (cancelEditBtn) {
    cancelEditExercise();
    return;
  }

  const saveSetBtn = e.target.closest(".save-set");

  if (saveSetBtn) {
    const exerciseId = Number(saveSetBtn.dataset.exerciseId);

    saveEditedSet(exerciseId);
    return;
  }

  const saveDescriptionBtn = e.target.closest(".save-description");

  if (saveDescriptionBtn) {
    const id = Number(saveDescriptionBtn.dataset.id);

    saveExerciseDescription(id);

    return;
  }

  const deleteExerciseBtn = e.target.closest(".delete-exercise");

  if (deleteExerciseBtn) {
    const id = Number(deleteExerciseBtn.dataset.id);

    deleteExercise(id);

    return;
  }

  const deleteSetBtn = e.target.closest(".delete-set");

  if (deleteSetBtn) {
    const exerciseId = Number(deleteSetBtn.dataset.exerciseId);
    const setId = Number(deleteSetBtn.dataset.setId);

    deleteSet(exerciseId, setId);
  }
});

exercisesList.addEventListener("input", (e) => {
  const textarea = e.target.closest(".exercise-description-input");

  if (!textarea) return;

  const id = Number(textarea.dataset.id);

  const workout = getActiveWorkout();
  if (!workout) return;

  const exercises = getActiveWeekExercises();

  const exercise = exercises.find((exercise) => {
    return exercise.id === id;
  });

  if (!exercise) return;

  exercise.description = textarea.value;

  saveData();
});

document.addEventListener("click", (e) => {
  const clickedInsideMenu = e.target.closest(".exercise-menu");

  if (clickedInsideMenu) return;

  document.querySelectorAll(".exercise-dropdown").forEach((dropdown) => {
    dropdown.classList.add("hidden");
  });
});

workoutHistoryList.addEventListener("click", (e) => {
  const deleteHistoryBtn = e.target.closest(".delete-history");

  if (!deleteHistoryBtn) return;

  const id = Number(deleteHistoryBtn.dataset.id);

  deleteHistory(id);
});

workoutDescriptionInput.addEventListener("input", () => {
  const workout = getActiveWorkout();

  if (!workout) return;

  workout.description = workoutDescriptionInput.value;

  saveData();
});

changeImageBtn.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (e) => {
  const workout = getActiveWorkout();

  if (!workout) return;

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    workout.image = reader.result;

    saveData();
    renderWorkoutDetail();
    renderWorkouts();
  };

  reader.readAsDataURL(file);
});

finishYesBtn.addEventListener("click", () => {
  const workout = getActiveWorkout();

  if (!workout) return;

  if (workout.timer.started) {
    endWorkout();
  }

  const exercises = getActiveWeekExercises();

  exercises.forEach((exercise) => {
    exercise.done = false;
  });

  if (!workout.weekCompleted) {
    workout.weekCompleted = true;
    completedWorkoutsThisWeek++;
  }

  if (completedWorkoutsThisWeek >= 6) {
    showWeekCompleteModal();
  }

  hideFinishModal();
  saveData();
  renderAll();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

finishNoBtn.addEventListener("click", () => {
  hideFinishModal();
});

weekSelect.addEventListener("change", () => {
  setActiveWeek(Number(weekSelect.value));
});

completeWeekBtn.addEventListener("click", () => {
  toggleCompleteWeek();
});

weekCompleteOkBtn.addEventListener("click", () => {
  if (!completedWeeks.includes(activeWeek)) {
    completedWeeks.push(activeWeek);
  }

  completedWorkoutsThisWeek = 0;

  workouts.forEach((workout) => {
    workout.weekCompleted = false;
  });

  hideWeekCompleteModal();
  saveData();
  renderAll();
});

themeToggleBtn.addEventListener("click", toggleTheme);

exportDataBtn.addEventListener("click", exportData);

importDataBtn.addEventListener("click", () => {
  importDataInput.click();
});

importDataInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  importData(file);
});

if (barEndWorkoutBtn) {
  barEndWorkoutBtn.addEventListener("click", () => {
    showFinishModal();
  });
}

// ======================================================
// INITIAL LOAD
// ======================================================

function removeExerciseEverywhere(exerciseName) {
  workouts.forEach((workout) => {
    const targetName = exerciseName.toLowerCase();

    workout.exercises = workout.exercises.filter((exercise) => {
      return exercise.name.toLowerCase() !== targetName;
    });

    if (workout.weekData) {
      Object.keys(workout.weekData).forEach((week) => {
        workout.weekData[week] = workout.weekData[week].filter((exercise) => {
          return exercise.name.toLowerCase() !== targetName;
        });
      });
    }
  });

  saveData();
  renderAll();
}

loadData();
updateActiveWorkoutIfNeeded();
renderAll();
applyTheme();

const activeWorkout = getActiveWorkout();

if (activeWorkout && activeWorkout.timer.started) {
  clearInterval(workoutTimerInterval);

  workoutTimerInterval = setInterval(() => {
    renderWorkoutDetail();
  }, 1000);
}

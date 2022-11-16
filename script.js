let ringEls = [...document.querySelectorAll(".hanoi-ring")]
const hanoiRingsEls = [...document.querySelectorAll(".hanoi-rings")]
const scoreEl = document.querySelector("#score")

let rodsNumbers = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [], []]
let score = 0

const config = {
  showNumbers: true,
  rings: 10
}

let selectedRodIndex = -1 // will be set as soon as it gets clicked

// it takes numbers of two rods and returns new ones
const moveRing = (rod1, rod2) => {
  if (rod1.length === 0) throw new Error("Cannot move an empty rod!")

  if (rod2.length === 0) return [rod1.slice(1), [rod1[0]]]

  if (rod2[0] < rod1[0])
    throw new Error(
      "Cannot put that ring on the second rod because it's not allowed!"
    )

  return [rod1.slice(1), [rod1[0], ...rod2]]
}

const arrayEquals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i])

const createRingEl = ringNumber => {
  const ringEl = document.createElement("div")
  ringEl.classList.add("hanoi-ring")
  ringEl.setAttribute("data-ring-num", ringNumber)
  if (config.showNumbers) ringEl.innerText = ringNumber
  return ringEl
}

// putting the rodsNumbers Array into the DOM
let ringsAndSpaceEls = []
// 1. creating the ring and empty div elements
const createRingsAndEmptyElements = rodsNumbers => {
  for (let rodNumbers of rodsNumbers) {
    const _emptySpaceEls = Array(config.rings)
      .fill()
      .filter((_, i) => !rodNumbers.includes(i + 1))
      .map(() => {
        console.log(`${rodNumbers} - ${Math.random()}`)
        return document.createElement("div")
      })

    const _ringEls = Array(config.rings)
      .fill()
      .map((_, i) => i + 1) // makes [1,2,3,...]
      .filter((_, i) => rodNumbers.includes(i + 1))
      .map((rodNumber, i) => createRingEl(rodNumber))

    ringsAndSpaceEls.push([..._emptySpaceEls, ..._ringEls])
  }
}

// 2. putting elements onto the DOM

const putRingElementsIntoDOM = () => {
  for (
    let hanoiRingElementIndex = 0;
    hanoiRingElementIndex < hanoiRingsEls.length;
    hanoiRingElementIndex++
  ) {
    for (let i = 0; i < config.rings; i++) {
      hanoiRingsEls[hanoiRingElementIndex].appendChild(
        ringsAndSpaceEls[hanoiRingElementIndex][i]
      )
    }
  }
}

//3. update the ring elements
const updateRingElementsInJS = () => {
  ringEls = [...document.querySelectorAll(".hanoi-ring")]
}
// setting widths of rings according to the ring number
const setColorsAndWidthsOfRings = () => {
  ringEls.forEach(ringEl => {
    const ringNumber = ringEl.dataset.ringNum
    // same as  ringEl.getAttribute("data-ring-num")

    const ringWidthRatio = ringNumber / config.rings

    ringEl.style.width = `${ringWidthRatio * 100}%`
    ringEl.style.backgroundColor = `hsl(${
      (360 * ringWidthRatio) / 6 + 290
    }, 80%, 65%, 1)`
  })
}

// put the whole thing into updateTower function
const updateTower = rodsNumbers => {
  scoreEl.innerText = score
  ;[...document.querySelectorAll(".hanoi-rings *")].forEach(el => el.remove())
  ringsAndSpaceEls = []
  createRingsAndEmptyElements(rodsNumbers)
  putRingElementsIntoDOM()
  updateRingElementsInJS()
  setColorsAndWidthsOfRings()
}

// Event Listeners
document.body.addEventListener("click", e => {
  // since the rest of pointer events are set to none it chooses the .hanoi-section
  if (e.target.classList.contains("hanoi-section")) {
    const clickedRodIndex = e.target.dataset.sectionIndex

    if (selectedRodIndex === -1) {
      // When nothing is selected, it sets the selectedRodIndex
      selectedRodIndex = clickedRodIndex
      return
    }

    if (selectedRodIndex == clickedRodIndex) {
      return
    }

    try {
      // gets the result of hanoi tower movement and sets it
      const [movedFromRod, movedToRod] = moveRing(
        rodsNumbers[selectedRodIndex],
        rodsNumbers[clickedRodIndex]
      )

      rodsNumbers[selectedRodIndex] = movedFromRod
      rodsNumbers[clickedRodIndex] = movedToRod

      // resetting the selected index
      selectedRodIndex = -1

      ringEls.forEach(el => el.remove())
      score++

      // updating the DOM Stuff
      updateTower(rodsNumbers)

      // On Win it triggers
      if (
        arrayEquals(
          rodsNumbers[rodsNumbers.length - 1],
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        )
      ) {
        // win condition met
        setTimeout(() => {
          alert("You Win!")
        }, 500)
      }
    } catch (e) {
      alert(e)
    } finally {
      selectedRodIndex = -1
    }
  }
})

// App starts here
updateTower(rodsNumbers)

// TODO: Add functionality -- DONE
// TODO: Add COLORING MODE
// TODO: Make the app RESPONSIVE
// TODO: Make an indicator to which ROD is SELECTED

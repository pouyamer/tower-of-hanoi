let ringEls = [...document.querySelectorAll(".hanoi-ring")]
const hanoiRingsEls = [...document.querySelectorAll(".hanoi-rings")]
const rodsNumbers = [[1, 5, 6, 7, 8, 9, 10], [2, 3], [4]]

const config = {
  showNumbers: false,
  rings: 10
}

// it takes numbers of two rods and returns new ones
const moveRing = (rod1, rod2) => {
  if (rod1.length === 0) throw new Error("First row cannot be empty!")

  if (rod2.length === 0) {
    return [rod1.slice(1), [rod1[0]]]
  }

  if (rod2[0] < rod1[0]) {
    throw new Error(
      "Cannot put that ring on the second row because it's not allowed!"
    )
  }

  return [rod1.slice(1), [rod1[0], ...rod2]]
}

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
const createRingsAndEmptyElements = () => {
  for (let rodNumbers of rodsNumbers) {
    const _emptySpaceEls = Array(config.rings)
      .fill()
      .filter((_, i) => !rodNumbers.includes(i + 1))
      .map(() => document.createElement("div"))

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
    const ringNumber = ringEl.getAttribute("data-ring-num")
    const ringWidthRatio = ringNumber / config.rings

    ringEl.style.width = `${ringWidthRatio * 100}%`
    ringEl.style.backgroundColor = `hsl(${
      (360 * ringWidthRatio) / 9
    }, 80%, 65%)`
  })
}

// put the whole thing into updateTower function
const updateTower = () => {
  createRingsAndEmptyElements()
  putRingElementsIntoDOM()
  updateRingElementsInJS()
  setColorsAndWidthsOfRings()
}

// App starts here
updateTower()

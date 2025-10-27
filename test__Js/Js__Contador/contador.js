async function iniciar () {
  for (let index = 1; index <= 10; index++) {
    await esperaUnSegundo()
    console.clear()
    console.log(index)
  }
}

async function esperaUnSegundo () {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('Han pasado 1 segundo')
}

iniciar()

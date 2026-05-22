import figlet from "figlet"

export const getTitle = function () {
  const title = 'Mail Buu'
  return figlet.textSync(title, {
    horizontalLayout: "fitted",
  })
}
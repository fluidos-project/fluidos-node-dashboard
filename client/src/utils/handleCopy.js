// it is used to enable copy on click of text in table cells
const handleCopy = (text, configureAlert) => {
    navigator.clipboard.writeText(text).then(() => {
        configureAlert({ type: "success", message: "text copied" });
    })
}

export default handleCopy
export function download(fileId: number) {
  fetch("http://localhost:5001", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ specialID: getId(fileId) }),
  }).then((response) => {
    const reader = response.body && response.body.getReader();
    console.log("reader", reader)
    reader &&
      reader.read().then(({ done, value }) => {
        successCb(value);
      });
  });
}

function successCb(response: any) {
  var URL = window.URL || window.webkitURL;
  if (URL) {
    var blob = new Blob([response], { type: "application/zip" });
    var url = URL.createObjectURL(blob);
    window.open(url);
  }
}

function getId(fileId: number) {
  const specialID = veryComplexBusinessLogic(fileId);
  const targetFile = secretIDMapping[specialID];
  return targetFile;
}

const veryComplexBusinessLogic = (fileID: number) => fileID * 2;

const secretIDMapping: { [key: number]: string } = {
  2: "one",
  4: "22",
  6: "33threee",
};

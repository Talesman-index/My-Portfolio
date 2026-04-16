const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

const caseStudyStart = lines.findIndex(l => l.includes("const CaseStudy = ({ id }: { id: 'asset-iq' | 'ehadj' }) => {"));
let cvViewEnd = -1;
for (let i = caseStudyStart; i < lines.length; i++) {
  if (lines[i].includes('if (currentView === \'cv\') {')) {
    cvViewEnd = i - 1;
    break;
  }
}

if (caseStudyStart !== -1 && cvViewEnd !== -1) {
  console.log("Found CaseStudy at line", caseStudyStart);
  console.log("Found CVView end at line", cvViewEnd);
  
  const componentsStr = lines.slice(caseStudyStart, cvViewEnd).join('\n');
  
  let newComponentsStr = componentsStr
    .replace("const CaseStudy = ({ id }: { id: 'asset-iq' | 'ehadj' }) => {", "const CaseStudy = ({ id, mousePos, setCurrentView }: { id: 'asset-iq' | 'ehadj', mousePos: { x: number, y: number }, setCurrentView: any }) => {")
    .replace("const CVView = () => {", "const CVView = ({ setCurrentView }: { setCurrentView: any }) => {");
    
  lines.splice(caseStudyStart, cvViewEnd - caseStudyStart);
  
  const appStart = lines.findIndex(l => l.includes('function App() {'));
  lines.splice(appStart, 0, newComponentsStr);
  
  let newContent = lines.join('\n');
  newContent = newContent.replace("<CVView />", "<CVView setCurrentView={setCurrentView} />");
  newContent = newContent.replace("<CaseStudy id={currentView as 'asset-iq' | 'ehadj'} />", "<CaseStudy id={currentView as 'asset-iq' | 'ehadj'} mousePos={mousePos} setCurrentView={setCurrentView} />");
  
  fs.writeFileSync('src/App.tsx', newContent);
  console.log("App.tsx modified successfully.");
} else {
  console.log("Could not find start or end.", caseStudyStart, cvViewEnd);
}

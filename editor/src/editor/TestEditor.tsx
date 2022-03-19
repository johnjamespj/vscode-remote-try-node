import "./atom.css"
import { EditorContainer } from "./EditorContainer"

export function TestEditor() {
    return <div id="test-editor">
        <div id="test-editor-toolbar">
            <h1>Toolbar</h1>
        </div>

        <div id="editor">
            <EditorContainer />
        </div>
    </div>
}

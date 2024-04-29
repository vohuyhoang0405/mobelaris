import Editor from "@monaco-editor/react"
import { TinaTemplate } from "@tinacms/cli"
import * as React from "react"
import { useEffect } from "react"
// import {
//   Zilla_Slab_Highlight
// } from "next/font/google"
import { useRef, useState } from "react"
import { Field, TextArea, wrapFieldsWithMeta } from "tinacms"
export const tablefield: Field = {
  label: "Strings",
  name: "Strings",
  type: "rich-text",
  description: "My custom saturation field",
}
export const jsonfield: Field = {
  label: "Data",
  name: "JSON",
  type: "string",
  description: "Store default data",

  ui: {
    parse: (val) => val,
    component: wrapFieldsWithMeta(({ field, input, meta }) => {
      const editorRef = useRef(null)
      function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
      }

      function handleEditorValidation(markers, context) {
        markers.forEach((marker) => console.log("onValidate:", marker.message))
      }
      return (
        <div className="w-full border-2 bg-white py-6 shadow-inner">
          <Editor
            height="calc(100vh - 270px)"
            onChange={(e, ev) => {
              console.log({ e })
              input.onChange(e)
            }}
            onValidate={handleEditorValidation}
            defaultLanguage="json"
            defaultValue={input.value}
            onMount={handleEditorDidMount}
          />
        </div>
      )
    }),
  },
}
export const feedField: Field = {
  label: "Data",
  name: "JSON",
  type: "string",

  description: "Store default data",
  ui: {
    parse: (val) => val,
    component: wrapFieldsWithMeta(({ field, input, meta }) => {
      const editorRef = useRef(null)
      function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
      }

      function handleEditorValidation(markers, context) {
        markers.forEach((marker) => console.log("onValidate:", marker.message))
      }
      return (
        <div className="w-full border-2 bg-white py-6 shadow-inner">
          <Editor
            height="calc(100vh - 270px)"
            onChange={(e, ev) => {
              console.log({ e })
              input.onChange(e)
            }}
            onValidate={handleEditorValidation}
            defaultLanguage="json"
            defaultValue={input.value}
            onMount={handleEditorDidMount}
          />
        </div>
      )
    }),
  },
}
function CountdownpositionfieldU({ field, input, meta }) {
  const [state, setState] = useState(() => JSON.parse(input.value || "{}"))
  const [fonts, setFonts] = useState(() => ({ [state.font]: state.font } || {}))
  useEffect(() => {
    fetch("/api/fonts")
      .then((res) => res.json())
      .then((res) => setFonts(res?.data))
  }, [])
  return (
    <form
      onChange={(e) => {
        setState((state) => {
          const newstate = {
            ...state,
            [e.target.name]: e.target.value,
          }
          input.onChange({
            target: {
              ...input,
              value: JSON.stringify(newstate),
            },
          })
          return newstate
        })
      }}
      onBlur={(e) => {
        console.log("blur", e)
      }}
      className="flex flex-col gap-2"
    >
      {["top", "left", "width", "font-size"].map((name) => (
        <div key={name} className="flex items-center gap-2">
          <input
            name={name}
            type="range"
            min={0}
            max="100"
            defaultValue={state[name] || ""}
            className="range"
          ></input>
          <label>
            {name}: {state[name]}%
          </label>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <div>Fonts:</div>
        <select
          name="font"
          defaultValue={state["font"]}
          className="block w-full cursor-pointer appearance-none truncate rounded-md border border-gray-200 bg-white py-2 pl-3 pr-8 text-base text-gray-700 shadow focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="">None</option>
          {Object.keys(fonts).map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
      </div>
    </form>
  )
}
export const countdownpositionfield: Field = {
  label: "STYLE",
  name: "style_json",
  type: "string",
  description: "Position of countdown",
  defaultValue: {
    datetime: "2023-02-24T17:00:00.000Z",
    link: "/collections/express-delivery",
    bg: "/uploads/EN-GB-banner-0110-desktop.jpg",
    countdown_postion: '{"top":"73","left":"9","width":"22","font-size":"50"}',
    bg_mobile: "/uploads/EN-GB-banner-0110-mobile.jpg",
    mobile_countdown_postion: '{"top":"45","left":"21","width":"62"}',
  },
  ui: {
    parse: (val) => val,
    component: wrapFieldsWithMeta(CountdownpositionfieldU),
  },
}
export const heroTextfield: Field = {
  label: "STYLE",
  name: "text",
  type: "string",
  description: "Text",
  ui: {
    parse: (val) => val,
    component: wrapFieldsWithMeta(({ field, input, meta }) => {
      const [state, setState] = React.useState(() =>
        JSON.parse(input.value || "{}")
      )
      const [fonts, setFonts] = React.useState(
        () => ({ [state.font]: state.font } || {})
      )
      useEffect(() => {
        fetch("/api/fonts")
          .then((res) => res.json())
          .then((res) => setFonts(res?.data))
      }, [])
      return (
        <form
          onChange={(e) => {
            setState((state) => {
              const newstate = {
                ...state,
                [e.target.name]: e.target.value,
              }
              input.onChange({
                target: {
                  ...input,
                  value: JSON.stringify(newstate),
                },
              })
              return newstate
            })
          }}
          onBlur={(e) => {
            console.log("blur", e)
          }}
          className="flex flex-col gap-2"
        >
          {["top", "left", "width"].map((name) => (
            <div key={name} className="flex items-center gap-2">
              <input
                name={name}
                type="range"
                min={0}
                max="100"
                defaultValue={state[name] || ""}
                className="range"
              ></input>
              <label>
                {name}: {state[name]}%
              </label>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div>Fonts:</div>
            <select
              name="font"
              defaultValue={state["font"]}
              className="block w-full cursor-pointer appearance-none truncate rounded-md border border-gray-200 bg-white py-2 pl-3 pr-8 text-base text-gray-700 shadow focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">None</option>
              {Object.keys(fonts).map((name) => (
                <option value={name}>{name}</option>
              ))}
            </select>
          </div>
        </form>
      )
    }),
  },
}
export const seoBlock: TinaTemplate = {
  name: "seo",
  label: "Seo",
  ui: {
    defaultItem: {
      title: "Designer Classic, Mid Century Furniture & Lightiing",
      description:
        "Designer Editions bring together a collection of designer classic furniture and lighting, choosing the best factories, built and hand finished by artisans. Designer furniture and lighting has never been so obtainable, direct factory prices available by missing out the middle men, large showrooms and cost.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        parse: (val) => val,
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return <TextArea {...input} />
        }),
      },
    },
    jsonfield,
  ],
}

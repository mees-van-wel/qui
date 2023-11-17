import { component$, useSignal, $ } from "@builder.io/qwik";
import { ColorInput, Paper } from "./components";
import { UiContextProvider } from "./context";

const Next = component$(() => {
  const clickHandler = $(() => {
    alert("lol");
  });

  return (
    <>
      <ColorInput />
      {/* <Modal title="Modal" state={signal}>
        This is the content
      </Modal> */}
      {/* <RichTextEditor
        value={signal.value}
        onChange$={(value) => {
          signal.value = value;
        }}
      /> */}
      {/* <Progress
        sections={[
          { value: 20, color: "grape", label: "Grape" },
          { value: 50, color: "cyan", label: "Cyan" },
          { value: 60, color: "red", label: "Red" },
        ]}
        subProps={{
          sections: [
            undefined,
            {
              onClick$: clickHandler,
            },
          ],
        }}
      />
      <Popover trigger={<p>This is complex</p>}>
        This is what UI wanna show
      </Popover> */}
      {/* <Notification title="asasd" loading /> */}
      {/* <RichTextEditor
        value={state.value}
        onChange$={(value) => { 
          state.value = value;
        }}
      /> */}
      {/* <SelectInput
        multiple
        value={value.value}
        // error="lol"
        onChange$={(va) => {
          value.value = va;
        }}
        data={[
          {
            group: "Monkey",
            label: "Foo",
            value: 1,
          },
          {
            group: "Monkey",
            label: "Bar",
            value: 2,
          },
          {
            label: "Baz",
            value: 3,
          },
        ]}
        label="Select"
      /> */}
    </>
  );
});

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik UI</title>
      </head>
      {/* <body> */}
      <body data-theme="dark">
        <UiContextProvider>
          <div
            style={{
              margin: "50px",
            }}
          >
            <Paper>
              <Next />
            </Paper>
          </div>
          {/* <Notification
              title="Info"
              icon={<IconInfoCircle />}
              onClose$={() => {}}
            >
              This is an Info message
            </Notification>
            <Notification
              title="Success"
              icon={<IconCheck />}
              color="green"
              onClose$={() => {}}
            >
              This is an Success message
            </Notification>
            <Notification
              title="Warning"
              icon={<IconAlertTriangle />}
              color="orange"
              onClose$={() => {}}
            >
              This is an Warning message
            </Notification>
            <Notification
              title="Error"
              icon={<IconX />}
              color="red"
              onClose$={() => {}}
            >
              This is an Error message
            </Notification> */}
        </UiContextProvider>
      </body>
    </>
  );
};

import { component$, useSignal } from "@builder.io/qwik";
import {
  Accordion,
  Paper,
  PinInput,
  SelectInput,
  SelectValue,
} from "./components";
import { UiContextProvider } from "./context";

const Next = component$(() => {
  const value = useSignal<SelectValue[]>([1, 3]);

  return (
    <>
      <SelectInput
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
      />
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

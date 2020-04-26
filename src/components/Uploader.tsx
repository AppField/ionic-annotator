import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { CSVReader } from "react-papaparse";
import { useAnnotateContext } from "../pages/AnnotatorManager";
import { AnnotateData, Column } from "../models/Data";
import { useForm, Controller, DeepPartial } from "react-hook-form";
import ErrorMessage, { renderErrorMessages } from "./ErrorMessage";

const minLength = 3;
const maxLength = 50;

interface FormValues {
  columnToAnnotate: Column | undefined;
  annotationColumn: Column | undefined;
  useExistingAnnotationColumn: boolean;
  newColumnName: string;
}

const initialValues = {
  columnToAnnotate: undefined,
  annotationColumn: undefined,
  useExistingAnnotationColumn: true,
  newColumnName: "",
} as DeepPartial<FormValues>;

const Uploader: React.FC = () => {
  const { setData } = useAnnotateContext();
  const [localData, setLocalData] = useState<AnnotateData>();

  // form
  const { control, handleSubmit, errors, getValues, watch } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (values: FormValues) => {
    if (localData) {
      let data = { ...localData };
      data.toAnnotateColumn = values.columnToAnnotate;
      if (values.useExistingAnnotationColumn) {
        data.annotationColumn = values.annotationColumn;
      } else {
        data = addAnnotationColumn(data, values.newColumnName);
      }
      setData(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Upload CSV file</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="ion-margin">
            <CSVReader
              onDrop={(csv: any) => {
                setLocalData(prepareAnnotateData(csv));
              }}
            >
              <span>Drag'n Drop or click to upload your file</span>
            </CSVReader>
          </div>
        </IonCardContent>
      </IonCard>

      {localData && (
        <>
          <IonCard>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Column to annotate</IonLabel>

                  <Controller
                    name="columnToAnnotate"
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => selected.detail.value}
                    rules={{
                      required: {
                        value: true,
                        message: (
                          <ErrorMessage message="Please select the column which contains the text you want to annotate" />
                        ),
                      },
                    }}
                    as={
                      <IonSelect
                        placeholder="Select the column to annotate"
                        compareWith={compareColumn}
                        okText="Choose"
                      >
                        {localData.header.map((header, index) => (
                          <IonSelectOption
                            key={index}
                            value={{ name: header, index } as Column}
                          >
                            {header}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    }
                  />
                  {errors.columnToAnnotate?.message}
                </IonItem>

                <IonItem>
                  <IonLabel>Use existing column for annotation</IonLabel>
                  <Controller
                    name="useExistingAnnotationColumn"
                    as={IonCheckbox}
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => selected.detail.checked}
                  />
                </IonItem>

                {watch().useExistingAnnotationColumn ? (
                  <IonItem>
                    <IonLabel position="stacked">
                      Column for annotation
                    </IonLabel>
                    <Controller
                      name="annotationColumn"
                      control={control}
                      onChangeName="onIonChange"
                      onChange={([selected]) => selected.detail.value}
                      rules={annotateColumnRules(
                        getValues().useExistingAnnotationColumn
                      )}
                      as={
                        <IonSelect
                          placeholder="Select the annotation column"
                          compareWith={compareColumn}
                          okText="Choose"
                        >
                          {localData.header.map((header, index) => (
                            <IonSelectOption
                              key={index}
                              value={{ name: header, index } as Column}
                            >
                              {header}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      }
                    />
                    {errors.annotationColumn &&
                      renderErrorMessages(errors, "annotationColumn")}
                  </IonItem>
                ) : (
                  <IonItem>
                    <IonLabel position="stacked">
                      New annotation column name
                    </IonLabel>
                    <Controller
                      name="newColumnName"
                      as={IonInput}
                      placeholder="Enter new column name"
                      control={control}
                      onChangeName="onIonChange"
                      onChange={([selected]) => selected.detail.value}
                      rules={newColumnNameRules(
                        getValues().useExistingAnnotationColumn
                      )}
                    />
                    {errors.newColumnName?.message}
                  </IonItem>
                )}
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" type="submit">
                  Save and use CSV file
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      )}
    </form>
  );
};

export default Uploader;

const prepareAnnotateData = (uploadedCsv: any[]): AnnotateData => {
  const copy = uploadedCsv.map((c: { data: any[] }) => c.data) as any[];

  const header = copy[0];
  const csv = copy.slice(1);

  // csv parser adds an empty row at the end. Check if it exists and remove it
  if (csv[csv.length - 1][0] === "") {
    csv.pop();
  }

  return new AnnotateData(header, csv);
};

const addAnnotationColumn = (
  data: AnnotateData,
  name: string
): AnnotateData => {
  data.header.push(name);
  data.csv = data.csv.map((row: any[]) => [...row, null]);

  const annotationColumn = {
    index: data.header.length - 1,
    name: name,
  } as Column;
  data.annotationColumn = annotationColumn;

  return data;
};

const compareColumn = (column1: Column, column2: Column): boolean => {
  return column1?.index === column2?.index;
};

// Rule functions
const annotateColumnRules = (useExisting: boolean) => {
  const rules = {
    required: {
      value: useExisting,
      message: (
        <ErrorMessage message="Please select an existing column for you annotations" />
      ),
    },
  };
  return rules;
};

const newColumnNameRules = (useExisting: boolean) => {
  const rules = {
    minLength: {
      value: minLength,
      message: (
        <ErrorMessage message={`Must be ${minLength} characters long`} />
      ),
    },
    maxLength: {
      value: maxLength,
      message: (
        <ErrorMessage
          message={`Must not be longer than ${maxLength} characters`}
        />
      ),
    },
    required: {
      value: !useExisting,
      message: (
        <ErrorMessage message="Please specify the name of the new column for your annotations" />
      ),
    },
  };

  return rules;
};

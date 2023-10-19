/* eslint-disable @typescript-eslint/ban-types */

export class JsonConverter {

    public static parseJsonToStringToDB(jsonIn: Object[]): string {
        let jsonArr_string = "[";

        for (let i = 0; i < jsonIn.length; i++) {
            jsonArr_string += JSON.stringify(jsonIn[i]);

            if (i < jsonIn.length - 1) {
                jsonArr_string += ",";
            }
        }

        jsonArr_string += "]";

        return jsonArr_string;
    }

    public static parseStringDBToJson(stringJsonIn: string): Object[] {

        return JSON.parse(stringJsonIn);
    }
}

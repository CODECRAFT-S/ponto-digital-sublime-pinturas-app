import axios, { AxiosError } from "axios";
import { apiUrl } from "@scripts/apiUrl";
import { KeyApi } from "@constants/KeyApi";

export async function handleWorkPoint(latitude: string, longitude: string) {
    try {
        const result = await axios.get(apiUrl("/workpoint"), {
            headers: {
                Authorization: KeyApi,
            },
            params: {
                lat: latitude,
                log: longitude,
            },
        });
        if (result.status === 200) {
            const data: WorkPointProps = result.data;
            return data;
        } else {
            throw new Error();
        }
    } catch (error) {
        throw new CustomError(
            "Erro inesperado ao encontrar o ponto.",
            "Error_Search_Point"
        );
    }
}

export async function handleRegisterPoint(formData: FormDataProps, token: string) {
    try {
        const file = {
            uri: formData.file,
            name: `${formData.datetime}-${formData.latitude}_${formData.longitude}`, // e.g. 'image123.jpg',
            type: "image/jpeg",
        };

        const formDataToSend = new FormData();
        formDataToSend.append("work_point_id", formData.workPointId);
        formDataToSend.append("latitude", formData.latitude);
        formDataToSend.append("longitude", formData.longitude);
        formDataToSend.append("datetime", formData.datetime);
        formDataToSend.append("file", file);

        const response = await axios.post(
            apiUrl("/point/save"),
            formDataToSend,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            return response;
        } else {
            throw new Error();
        }
    } catch (error) {
        throw new CustomError(
            "Erro inesperado ao registrar o ponto.",
            "Error_Register_Point"
        );
    }
}

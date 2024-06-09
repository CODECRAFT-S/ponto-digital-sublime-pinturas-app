interface UserDetails {
    status: boolean,
    data: {
        user: string,
        userid: number,
        username: string,
        usermail: string,
        token: string
    }
}

interface PointOfflineProps {
    latitude: string;
    longitude: string;
    datetime: string;
    file: string;
}

interface WorkPointProps {
    status: string;
    data:
        | {
              id: Number;
              name: string;
              latitude: string;
              longitude: string;
              distance: Number;
          }
        | [];
}

interface FormDataProps {
    workPointId: string;
    latitude: string;
    longitude: string;
    datetime: string;
    file: string;
}

interface PointProps {
    id: Number;
    system_user_id: Number;
    work_point_id: Number;
    latitude: String;
    longitude: String;
    datetime: String;
    file: String;
    created_at: String;
    deleted_at: String | null;
}

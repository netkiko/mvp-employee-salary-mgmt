export const uploadEmployee = async (props) => {
    const { emplid, login, name, salary, localData } = props;
    try {
        const reqBody = {
            login,
            name,
            salary,
        };
        const uploadResult = await fetch(`/api/employees/${emplid}`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                data: localData,
            },
        });
        const uploadResp = await uploadResult.json();
        // console.log('uploadEmployee response', uploadResp);
        return uploadResp;
    } catch (error) {
        // console.log('uploadEmployee error', error);
        return {};
    }
};

class ProcessesMapper {
    updateOne(body) {
        const mappedBody = {
            process_number: body.process_number,
            description: body.description,
            complainer: body.complainer,
            claimed: body.claimed,
            lawyer: body.lawyer,
            status: body.status,
            creation_date: body.creation_date,
            customer: body.customer
        };

    for(const prop in mappedBody) {
        if (!mappedBody[prop]) {
            delete mappedBody[prop];
        }
    }

    return mappedBody;

    }
}

export default new ProcessesMapper();

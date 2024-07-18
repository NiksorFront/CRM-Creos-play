
export type commentType = {date_created: string, 
                           designer: {avatar: string, username: string, thumbnails: {avatar: string, avatar_2x: string, avatar_webp: string, avatar_webp_2x: string}},
                           id: number, 
                           issue: string, 
                           message: string
                          }

export type designerType = {avatar: string, 
                            email: string, 
                            issues: Array<{key: string, date_created: string, status: string}>, 
                            thumbnails: {avatar: string, avatar_2x: string, avatar_webp: string, avatar_webp_2x: string}, 
                            username: string
                           }

export type issueType ={date_created: string, 
                        date_finished: string,
                        date_finished_by_designer: string,
                        date_started_by_designer: string,
                        date_updated: string,
                        designer: string,
                        id: number,
                        project: string
                        received_from_client: number,
                        send_to_account_manager: number,
                        send_to_designer: number,
                        send_to_project_manager: number,
                        status: string,
                        summary: string}

export type weekType = {[key: number]: {received: number, expeness: number, earned: number}};
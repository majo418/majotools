
export type FuncObj<N extends string> = {
    [key in N]: (...params: [...any[]]) => any
}

export function objFuncReplace<Key extends string, Obj extends FuncObj<Key>>(
    obj: Obj,
    name: Key,
    repalcement: Obj[Key],
    times: number = -1,
): void {
    const oldFunc: Obj[Key] = obj[name]
    obj[name] = (
        (...params: any[]) => {
            if (times > -1) {
                times--
                if (times < 1) {
                    obj[name] = oldFunc
                }
            }
            return repalcement(...params)
        }
    ) as any
}

export function objFuncMiddleware<Key extends string, Obj extends FuncObj<Key>>(
    obj: Obj,
    name: Key,
    middleware: (next: Obj[Key], params: Parameters<Obj[Key]>) => ReturnType<Obj[Key]>,
    times: number = -1,
): void {
    if (typeof obj != "object" || obj == null) {
        throw new Error("First 'obj' parameter is not a object!")
    }
    let i = 2
    let newName: string
    do {
        newName = name + i++
    } while (typeof (obj as any)[newName] != undefined)
    (obj as any)[newName] = obj[name]
    obj[name] = (
        (...params: any[]) => {
            if (times > -1) {
                times--
                if (times < 1) {
                    obj[name] = (obj as any)[newName]
                }
            }
            return middleware(
                (
                    (
                        ...params: Parameters<Obj[Key]>
                    ): ReturnType<Obj[Key]> => (obj as any)[newName](...params)
                ) as any,
                params as any
            )
        }
    ) as any
}


import { Color4, Vector3 } from '@dcl/sdk/math'
import { EasingFunction, engine, Entity, Material, MeshCollider, MeshRenderer, Transform, TransformType, Tween } from '@dcl/sdk/ecs'

let playerPos: Vector3
let box: Entity

function getEntityPosition(entity: Entity) {
    const playerPosition = Transform.get(entity).position
    return playerPosition
} 

function getDistancebetweenVectors(a: Vector3, b: Vector3) {
    return Math.sqrt(
        Math.pow(a.x - b.x, 2) +
        Math.pow(a.y - b.y, 2) +
        Math.pow(a.z - b.z, 2)
    )
}

export function main() {

    box = engine.addEntity()

    Transform.create(box, {
        position: Vector3.create(7.5, 0.5, 7.5),
        // rotation: Vector3.create(0, 0, 0),
        // scale: Vector3.create(1, 1, 1),
    })
    
    MeshRenderer.setBox(box)

    Material.setPbrMaterial(box, {
        albedoColor: Color4.Red(),
        metallic: 1,
        roughness: 0.5,
    })

    MeshCollider.setBox(box)

    const boxTransform = Transform.getMutable(box)

    boxTransform.scale.x = 3
    boxTransform.scale.z = 3

    Tween.create(box, {
        duration: 10000,
        easingFunction: EasingFunction.EF_LINEAR,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(15, 0.5, 7.15),
            end: Vector3.create(1, 0.5, 1),
        }),
    })

    const playerPos = getEntityPosition(engine.PlayerEntity)

    console.log("Player position: ", playerPos.x, playerPos.y, playerPos.z)

    console.log("Distance to box : ", getDistancebetweenVectors(playerPos, boxTransform.position))

    //////// Box grabbed from the creator hub /////////\

    const box2 = engine.getEntityOrNullByName("box")

    if (box2) {
        console.log("Box entity found!")
    } 
}

export function getDistancewithBox() {
    const playerPos = getEntityPosition(engine.PlayerEntity)
    const boxTransform = Transform.getMutable(box)

    const distance = getDistancebetweenVectors(playerPos, boxTransform.position)
    
    if (distance < 4) {

        Material.setPbrMaterial(box, {
            albedoColor: Color4.White()
        })
        MeshCollider.setBox(box)
    
        console.log("Player is close to the box!")
    } else {
        MeshCollider.setBox(box)
        Material.setPbrMaterial(box, {
            albedoColor: Color4.Red()
        })
    }
}

engine.addSystem(getDistancewithBox)
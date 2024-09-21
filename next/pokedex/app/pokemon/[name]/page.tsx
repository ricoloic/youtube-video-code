import { Box, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

export default async function Page({ params }: { params: { name: string } }) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    const pokemon = await response.json();


    return (
        <Stack direction='column' padding='2rem' spacing={2} alignItems='center'>
            <Typography variant='h1' textAlign='center' paddingTop='3rem'>
                {params.name}
            </Typography>

            <Box
                component='img'
                sx={{
                    height: '350px',
                    objectFit: 'cover',
                    width: 'fit-content',
                    borderWidth: `1px`,
                    borderStyle: 'solid',
                    borderColor: 'divider',
                    borderRadius: '10px',
                }}
                alt={`Pokemon ${params.name}`}
                src={pokemon.sprites.front_default}
            />

            <Typography variant="h3">
                Abilities
            </Typography>
            <List>
                {pokemon.abilities.map(({ability}) => (
                    <ListItem key={ability.name}>
                        <ListItemText>
                            <Typography variant="h5">
                            {ability.name}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Stack>
    )
}